import { useRoute } from "@react-navigation/native";
import { Text } from "../../components/Text/Text";
import { ScrollContainer } from "../../styles/global";
import { useTransactions } from "../../hooks/useTransactions";
import { doc, getDoc, } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../utils/formatter"; 


export function TransactionDetails() {
    const[transaction, setTransaction] = useState()
    const {user} = useAuth()
    const route = useRoute()
    const {transactionId} = route.params
    const {getTransactionById} = useTransactions()

    async function getTransaction() {
            try {
                const transactionRef = doc(db, "company", user?.uid, "transactions",transactionId)
                const snapshot = await getDoc(transactionRef)
                
                if(snapshot.exists()){
                    setTransaction({
                        id: snapshot.id,
                        ...snapshot.data(),
                    })
                }
                else{
                    console.log("Transação não encontrada");
                }
            } catch (error) {
                console.error("Erro ao buscar transação:", error);
            }
        }
    
        useEffect(() => {
            getTransaction()
        }, [])

    return (
        <ScrollContainer>
            <Text>Detalhes da transação: {transactionId}</Text>
            <Text>{transaction?.name}</Text>
            <Text>{formatDate(transaction?.date)}</Text>
            <Text>{transaction?.amount}</Text>
        </ScrollContainer>
    )
}
