import { Container, ScrollContainer } from "../../styles/global";
import { ContentBlock } from "./style";
import { Text } from "../../components/Text/Text";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input/InputField";
import { FlatList } from "react-native";
import { useState } from "react";


export function FinancialTransactions(){
    const transactionsList = [
        {name: "Salary Payment",date: "01/02/2025",amount: 3500.00},
        {name: "Grocery Store Purchase",date: "03/02/2025",amount: -250.75},
        {name: "Savings Deposit",date: "05/02/2025",amount: 500.00},
        {name: "Internet Bill Payment",date: "07/02/2025",amount: -99.90},
        {name: "Incoming Transfer",date: "10/02/2025",amount: 200.00}
    ];

    const [transactions, setTransactions] = useState(transactionsList)
    const [filter, setFilter] = useState()
    const [filteredList, setFilteredList] = useState([])


    return(
        <Container>
            <ScrollContainer>
                <ContentBlock>
                    <Text variant="title">Movimentações</Text>
                </ContentBlock>

                <ContentBlock>
                    <InputField
                        label={'Filtrar transações'}
                        placeholder="Pesquisar"
                        value={filter}
                        onChangeText={setFilter}
                    />

                    <Button
                        buttonStyle="primary"
                        size="large"
                        flex={true}
                    >
                    Buscar
                    </Button>
                </ContentBlock>

                <ContentBlock>
                    <Text variant="subtitle">Filtrar</Text>
                </ContentBlock>

                <ContentBlock>
                    <FlatList
                        data={transactions}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                        <ContentBlock>
                            <Text variant="title" style={{marginVertical: 5}}>{item.date}</Text>
                            <ContentBlock  style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                <Text>{item.name}</Text>
                                <Text style={{marginVertical: 5,  color: item.amount < 0 ? "red" : "green"}}>
                                {item.amount < 0 ? `- R$${Math.abs(item.amount)}` : `+ R$${item.amount}`}
                                </Text>
                            </ContentBlock>
                            
                            <ContentBlock style={{
                                height: 1,
                                backgroundColor: "#cccccc87",
                                width: "100%",
                                marginVertical: 10
                            }}/>
                        </ContentBlock>
                        
                        )}
                    />
                </ContentBlock>
                <ContentBlock>  
                    <Button 
                        buttonStyle="primary"
                        size="large"
                        flex={true}>Adicionar movimentação
                    </Button>
                </ContentBlock>
            </ScrollContainer>
        </Container>
    )
}