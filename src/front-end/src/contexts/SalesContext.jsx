import React, { createContext, useEffect, useState } from "react";
import { 
  collection, 
  getDocs, 
  query as dbQuery, 
  where, 
  addDoc, 
  getDoc, 
  orderBy, 
  onSnapshot 
} from "firebase/firestore";
import { db } from "@config/firebase";
import { useFlashMessage } from "@hooks/useFlashMessage";
import { useAuth } from "@hooks/useAuth";

export const SalesContext = createContext();

export function SalesProvider({ children }) {
  const [sales, setSales] = useState([]);
  const [loadingSales, setLoadingSales] = useState(false);
  const [currentMonthSales, setCurrentMonthSales] = useState({ docs: [], total: 0 });

  const { user } = useAuth();
  const { showFlashMessage } = useFlashMessage();

  function getTotalValue(salesList) {
    return salesList.reduce((total, sale) => {
      return total + Number(sale.amount || 0); 
    }, 0);
  }

  async function fetchSalesFromCurrentMonth() {
    if (!user?.uid) return;
    
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    try {
      setLoadingSales(true);
      const query = dbQuery(
        collection(db, "company", user.uid, "sales"),
        where("date", ">=", start),
        where("date", "<", end),
        orderBy("date", "desc")
      );

      const snapshot = await getDocs(query);
      const docs = snapshot.docs.map(sale => ({ id: sale.id, ...sale.data() }));

      setCurrentMonthSales({ docs, total: getTotalValue(docs) });
    } catch (error) {
      showFlashMessage('Erro ao carregar vendas do mês atual.', 'error');
    } finally {
      setLoadingSales(false);
    }
  }

  async function createSale(sale) {
    try {
      if (!sale.name || !sale.amount) throw new Error('Insira todos os campos obrigatórios: nome e valor.');

      const ref = collection(db, 'company', user.uid, 'sales');

      const createdSaleRef = await addDoc(ref, {
        ...sale,
        date: sale.date || new Date(),
        amount: Number(sale.amount)
      });

      const snapshot = await getDoc(createdSaleRef);

      showFlashMessage('Venda registrada com sucesso!', 'success');

      return {
        id: snapshot.id,
        ...snapshot.data()
      };
    } catch (error) {
      showFlashMessage(`Erro ao criar venda: ${error.message}`, 'error');
      throw new Error(error.message);
    }
  }

  useEffect(() => {
    if (!user || !user.uid) return;

    setLoadingSales(true);

    const ref = dbQuery(
      collection(db, "company", user.uid, "sales"),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(ref, snapshot => {
      const salesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSales(salesList);
      setLoadingSales(false);
    }, (error) => {
        setLoadingSales(false);
        showFlashMessage('Erro ao assinar atualizações de vendas.', 'error');
        console.error("Firebase onSnapshot error: ", error);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid) return;
    if (sales.length > 0) {
      fetchSalesFromCurrentMonth();
    }
  }, [sales, user?.uid]);

  return (
    <SalesContext.Provider 
      value={{
        sales,
        loadingSales,
        createSale,
        fetchSalesFromCurrentMonth,
        getTotalValue,
        currentMonthSales,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
}