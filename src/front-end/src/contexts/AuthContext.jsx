import { createContext, useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser
} from "firebase/auth";
import { InputError } from "../error/InputError";
import { doc, setDoc } from "firebase/firestore";
import { useFlashMessage } from "./FlashMessageContext";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showFlashMessage } = useFlashMessage()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoading(false);
    });
    return unsubscribe;
  }, []);


  async function register(email, password, displayName, userData) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      if (displayName) {
        await updateProfile(cred.user, { displayName });
      }

      const date = new Date()

      await setDoc(doc(db, "company", cred.user.uid), {
        name: displayName,
        email,
        ...userData,
        createdAt: date,
        updatedAt: date
      });

      showFlashMessage("Conta criada com sucesso. Você será redirecionado para realizar login.", "success");

      try {
        await signOut(auth);
      } catch (err) {
        showFlashMessage("Falha ao deslogar após cadastro", "error")
      }

      return cred.user;
    } catch (error) {
      showFlashMessage(
        "Erro ao criar conta. Por favor, verifique os campos digitados e tente novamente.",
        "error"
      );

      switch (error.code) {
        case "auth/email-already-in-use":
          throw new InputError("email", "Esse e-mail já está cadastrado.");
        case "auth/invalid-email":
          throw new InputError("email", "Formato de e-mail inválido.");
        case "auth/weak-password":
          throw new InputError("password", "A senha é fraca. Use pelo menos 8 caracteres.");
        default:
          console.error("Erro inesperado no register:", error);
          throw error;
      }
    }
  }


  async function login (email, password) {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      setUser(cred.user);

      showFlashMessage('Login efetuado com sucesso!', 'success')

      return cred.user;
    } catch (error) {
      throw new Error('Erro ao efetuar login. Verifique suas credenciais e tente novamente mais tarde.')
    }
    
  };

  async function logout() {
    await signOut(auth);
    showFlashMessage('Logout realizado com sucesso.', 'success')
    setUser(null);
  };

  async function resetPassword() {
    await sendPasswordResetEmail(auth, email);
  };

  async function deleteAccount(password) {
    if (!user)
      return

    const credential = EmailAuthProvider.credential(user.email, password)

    reauthenticateWithCredential(user, credential)
      .then((response) => {
        return deleteUser(user)
      })
      .then((response) => {
        showFlashMessage('Conta deletada com sucesso.', 'success')
      })
      .catch((error) => {
        showFlashMessage('Erro ao deletar conta. Por favor, tente novamente mais tarde', 'error')
      })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        resetPassword,
        deleteAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
