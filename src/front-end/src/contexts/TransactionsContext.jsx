const { createContext, useEffect, useState } = require("react");
import { collection, getDocs, query as dbQuery, where, addDoc, getDoc, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { useFlashMessage } from "../hooks/useFlashMessage";
import { useAuth } from "../hooks/useAuth";

export const TransactionsContext = createContext()

export function TransactionsProvider({children}) {
  const [transactions, setTransactions] = useState([])
  const [loadingTransactions, setLoadingTransactions] = useState(false)
  const [currentMonthTransactions, setCurrentMonthTransactions] = useState({docs: [], total: 0})

  const {user} = useAuth()
  const {showFlashMessage} = useFlashMessage()

  async function fetchTransactions() {
      try {
        setLoadingTransactions(true)
        const transactionsRef = collection(db, "company", user?.uid, "transactions");
        const snapshot = await getDocs(transactionsRef);

        const transactionsList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));   
        
        setTransactions(transactionsList)
      } catch (error) {
        showFlashMessage('Erro ao carregar transações. Por favor, tente mais tarde.', 'error')
      } finally {
        setLoadingTransactions(false)
      }
  }

  async function fetchTransactionsFromCurrentMonth() {
    const now = new Date();

    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const query = dbQuery(
      collection(db, "company", user.uid, "transactions"),
      where("date", ">=", start),
      where("date", "<", end)
    );

    const snapshot = await getDocs(query);
    const docs = snapshot.docs.map(transaction => ({ id: transaction.id, ...transaction.data() }));

    setCurrentMonthTransactions({docs, total: getTotalValue(docs)})
  }

  async function createTransaction(transaction) {
    try {
        if (!transaction.name || !transaction.category || !transaction.amount) throw new Error('Insira todos os campos.')

        const ref = collection(db, 'company', user.uid, 'transactions')

        const createdTransactionRef = await addDoc(ref, transaction)

        const snapshot = await getDoc(createdTransactionRef)

        return {
          id: snapshot.id,
          ...snapshot.data()
        }
    } catch (error) {
        throw new Error(error.message)
    }
  }

  function getTotalValue(transactions){ 
    return transactions.reduce((total, transaction) => { return total + Number(transaction.amount) }, 0) 
  }

  async function refresh() {
    await fetchTransactions()
  }

  useEffect(() => {
    if (!user || !user.uid) return;

    const ref = dbQuery(
      collection(db, "company", user.uid, "transactions"),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(ref, snapshot => {
      const transactionsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTransactions(transactionsList);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid) return;
    fetchTransactionsFromCurrentMonth();
  }, [transactions]);



  return (
    <TransactionsContext.Provider value={{
      transactions, 
      loadingTransactions, 
      fetchTransactions, 
      refresh, 
      fetchTransactionsFromCurrentMonth, 
      getTotalValue,
      createTransaction,
      currentMonthTransactions
    }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}