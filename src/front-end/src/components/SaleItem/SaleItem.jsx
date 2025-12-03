import { ContentBlock } from "../../styles/global";
import { Text } from "@components/Text/Text";
import {  Pressable, View } from "react-native";
import { AmountIndicator } from "@components/AmountIndicator/AmountIndicator";
import { Header, SecundaryText } from "./style";
import { formatDate } from "@utils/formatter";
import { Button } from "@components/Button/Button";

export function SaleItem({item}) {

    return (
        <Pressable>
            <ContentBlock>
                <Header>
                    <Text variant="subtitle" style={{marginVertical: 5}}>{formatDate(item.date)}</Text>
                    <AmountIndicator amount={item.amount} isInvoicing={true}/>
                </Header>
                <ContentBlock  style={{flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end"}}>
                    <View style={{maxWidth: '50%'}}>
                        {item.items.map((product) => {
                            return (
                            <SecundaryText color={'#8C8C8C'} numLines={1} key={product.id}>
                                {`${product.quantity}x ${product.name}`}    
                            </SecundaryText>)
                        })}
                    </View> 
                    <Button 
                        buttonStyle={'error'}
                    >
                        Excluir
                    </Button>                 
                </ContentBlock>
            </ContentBlock>
        </Pressable>
    )
}