import { useRoute, useNavigation } from "@react-navigation/native";
import { Text } from "../../components/Text/Text";
import { Container, ScrollContainer } from "../../styles/global";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../utils/formatter"; 
import { InputField } from "../../components/Input/InputField";
import { Button } from "../../components/Button/Button";
import { Box, ButtonContainer } from "./style";
import { useFlashMessage } from "../../hooks/useFlashMessage";


export function TransactionDetails() {
    const [transaction, setTransaction] = useState();
    const [isInvoicing, setIsInvoicing] = useState(true);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");

    const { user } = useAuth();
    const route = useRoute();
    const navigation = useNavigation();
    const { transactionId } = route.params;

    const { showFlashMessage } = useFlashMessage();

    async function getTransaction() {
        try {
            const transactionRef = doc(
                db,
                "company",
                user?.uid,
                "transactions",
                transactionId
            );

            const snapshot = await getDoc(transactionRef);

            if (snapshot.exists()) {
                const data = snapshot.data();

                setTransaction({ id: snapshot.id, ...data });

                setName(data.name || "");
                setCategory(data.category || "");
                setAmount(String(data.amount || ""));
                setIsInvoicing(data.type === "invoice");
            } else {
                console.log("Transação não encontrada");
            }
        } catch (error) {
            console.error("Erro ao buscar transação:", error);
        }
    }

    useEffect(() => {
        getTransaction();
    }, []);

    async function updateTransaction() {
        try {
            const transactionRef = doc(
                db,
                "company",
                user.uid,
                "transactions",
                transactionId
            );

            await updateDoc(transactionRef, {
                name,
                category,
                amount: Number(amount),
                type: isInvoicing ? "invoice" : "expense"
            });

                  
            showFlashMessage("Dados atualizados com sucesso!", "success");
            navigation.goBack();
        } catch (error) {
            showFlashMessage("Erro ao atualizar transação", "error");
            console.error("Erro ao atualizar transação:", error);
        }
    }

    return (
        <ScrollContainer>
            <Text variant="title">Detalhes da transação</Text>

            <Container>
                <Text variant="subtitle" style={{ marginBottom: 15 }}>
                    Data da transação: {formatDate(transaction?.date)}
                </Text>

                <Box>
                    <Button
                        onPress={() => setIsInvoicing(true)}
                        buttonStyle={isInvoicing ? "success" : "outline"}
                        style={{ width: "48%" }}
                        iconFamily={"Feather"}
                        icon={"trendingUp"}
                    >
                        Entrada
                    </Button>

                    <Button
                        onPress={() => setIsInvoicing(false)}
                        buttonStyle={!isInvoicing ? "error" : "outline"}
                        style={{ width: "48%" }}
                        iconFamily={"Feather"}
                        icon={"trendingDown"}
                    >
                        Saída
                    </Button>
                </Box>

                <InputField 
                    label="Nome da transação" 
                    value={name}
                    onChangeText={setName}
                />

                <InputField 
                    label="Categoria da transação"
                    value={category}
                    onChangeText={setCategory}
                />

                <InputField 
                    label="Valor da transação"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                />

                <ButtonContainer>
                    <Button buttonStyle={"primary"} flex onPress={updateTransaction}>
                        Salvar
                    </Button>

                    <Button
                        buttonStyle={"outline"}
                        flex
                        onPress={() => navigation.goBack()}
                    >
                        Cancelar
                    </Button>
                </ButtonContainer>
                
            </Container>
        </ScrollContainer>
    );
}