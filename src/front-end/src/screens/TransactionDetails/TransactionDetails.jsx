import { useRoute } from "@react-navigation/native";
import { Text } from "@components/Text/Text";
import { ScrollContainer } from "../../styles/global";

export function TransactionDetails() {
    const route = useRoute()
    const {transactionId} = route.params

    return (
        <ScrollContainer>
            <Text>Detalhes da transação: {transactionId}</Text>
        </ScrollContainer>
    )
}