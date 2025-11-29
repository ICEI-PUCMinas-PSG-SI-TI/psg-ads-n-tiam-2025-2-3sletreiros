import { useTheme } from "styled-components";
import { ContentBlock } from "../../styles/global";
import { Text } from "@components/Text/Text";
import { Icon } from "@components/Icon/Icon";
import {  Pressable, View } from "react-native";
import { AmountIndicator } from "@components/AmountIndicator/AmountIndicator";
import { DeleteItemButton, SecundaryText } from "@components/TransactionItem/style";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "@hooks/useAuth";
import { useFlashMessage } from "@hooks/useFlashMessage";
import { useNavigation } from "@react-navigation/native";
import { formatDate } from "@utils/formatter";

export function TransactionItem({item}) {
    const theme = useTheme()
    const {showFlashMessage} = useFlashMessage()
    const {user} = useAuth()
    const navigation = useNavigation()

    const isInvoicing = item.type === 'invoice'

    async function deleteTransaction() {
        try {
            const ref = doc(db, 'company', user.uid, 'transactions', item.id)

            await deleteDoc(ref)

            showFlashMessage('Transação deletada com sucesso!', 'success')
        } catch (error) {
            showFlashMessage('Erro ao deletar transação', 'error')
        }
    }

    function openDetails() {
        navigation.navigate('TransactionDetails', {transactionId: item.id})
    }

    return (
        <Pressable onPress={openDetails}>
            <ContentBlock>
                <Text variant="subtitle" style={{marginVertical: 5}}>{item.name}</Text>
                <ContentBlock  style={{flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end"}}>
                    <View>
                        <SecundaryText color={'#8C8C8C'}>{formatDate(item.date)}</SecundaryText>
                        <SecundaryText color={'#8C8C8C'}>{item.category}</SecundaryText>
                    </View>                     
                    <AmountIndicator amount={item.amount} isInvoicing={isInvoicing}/>
                </ContentBlock>
                <DeleteItemButton onPress={(event) => {
                    event.stopPropagation()
                    deleteTransaction()
                }}>
                    <Text color={theme.colors.error.text}>
                        Excluir 
                    </Text>
                    <Icon name={'delete'} size={14} color={theme.colors.error.text}/>
                </DeleteItemButton>
            </ContentBlock>
        </Pressable>
    )
}