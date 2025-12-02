import { useTheme } from "styled-components";
import { ContentBlock } from "../../styles/global";
import { Text } from "@components/Text/Text";
import { Icon } from "@components/Icon/Icon";
import {  Pressable, View } from "react-native";
import { AmountIndicator } from "@components/AmountIndicator/AmountIndicator";
import { DeleteItemButton, SecundaryText } from "@components/TransactionItem/style";
import { formatDate } from "@utils/formatter";

export function SaleItem({item}) {
    const theme = useTheme()

    return (
        <Pressable>
            <ContentBlock>
                <Text variant="subtitle" style={{marginVertical: 5}}>{item.name}</Text>
                <ContentBlock  style={{flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end"}}>
                    <View>
                        <SecundaryText color={'#8C8C8C'}>{formatDate(item.date)}</SecundaryText>
                        <SecundaryText color={'#8C8C8C'}>{item.category}</SecundaryText>
                    </View>                     
                    <AmountIndicator amount={item.amount} isInvoicing={true}/>
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