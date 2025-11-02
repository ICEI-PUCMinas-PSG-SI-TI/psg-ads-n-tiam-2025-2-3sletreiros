import { createContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification
} from "firebase/auth";
import { InputError } from "../error/InputError";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoading(false);
    });
    return unsubscribe;
  }, []);


  async function register (email, password, displayName) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      if (displayName) {
        await updateProfile(cred.user, { displayName });
      }
      setUser(cred.user);

      return cred.user;
    } catch (error) {

      switch (error.code) {
        case 'auth/email-already-in-use':
          throw new InputError('email', 'Esse e-mail já está cadastrado.');
        case 'auth/invalid-email':
          throw new InputError('email', 'Formato de e-mail inválido.');
        case 'auth/weak-password':
          throw new InputError('password', 'A senha é fraca. Use pelo menos 6 caracteres.');
        default:
          throw new InputError('general', error.message);
      }

    }
    
  };

  async function login (email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    setUser(cred.user);
    return cred.user;
  };

  async function logout() {
    await signOut(auth);
    setUser(null);
  };

  async function resetPassword() {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
