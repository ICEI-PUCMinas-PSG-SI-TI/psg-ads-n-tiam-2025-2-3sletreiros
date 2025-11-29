import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "@config/firebase";

export function useUser() {
  const [authUser, setAuthUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);

      if (!user) {
        setUserData(null);
        setLoading(false);
        return;
      }

      const ref = doc(db, "company", user.uid);

      const unsubscribeFirestore = onSnapshot(ref, async (snapshot) => {
        if (!snapshot.exists()) {
          setUserData(null);
          setLoading(false);
          return;
        }

        let data = snapshot.data();

        if (data.plan) {
          try {
            const snapPlan = await getDoc(data.plan);
            if (snapPlan.exists()) {
              data = {
                ...data,
                plan: snapPlan.data(),
              };
            }
          } catch (e) {
            console.log("Erro ao buscar plano:", e);
          }
        }

        setUserData(data);
        setLoading(false);
      });

      return () => unsubscribeFirestore();
    });

    return () => unsubscribeAuth();
  }, []);

  return {
    user: authUser,
    userData,
    loading,
  };
}