import { Container, ContentBlock } from "../../styles/global";
import { ContentHeader } from "./style";
import { Text } from "../../components/Text/Text";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input/InputField";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useState } from "react";
import { TransactionItem } from "../../components/TransactionItem/TransactionItem";
import { CustomModal } from "../../components/CustomModal/CustomModal";
import { useFlashMessage } from "../../hooks/useFlashMessage";
import { Timestamp } from "firebase/firestore";
import { useTransactions } from "../../hooks/useTransactions";


export function FinancialTransactions(){
    const {transactions, loadingTransactions, createTransaction} = useTransactions()

    const [filter, setFilter] = useState()
    const [creatingTransaction, setCreatingTransaction] = useState(false)

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [value, setValue] = useState("")
    const [isInvoicing, setIsInvoicing] = useState(true)

    const [visible, setVisible] = useState(false)

    const {showFlashMessage} = useFlashMessage()

    const handleTitleChange = (text) => setTitle(text);
    const handleCategoryChange = (text) => setCategory(text);
    const handleValueChange = (text) => setValue(text);
    
    function openModal() {
        setVisible(true)
    }

    function closeModal() {
        setVisible(false)
    }

    async function addTransaction(transaction) {
        try {
            setCreatingTransaction(true)
            await createTransaction(transaction)
            
            closeModal()
            showFlashMessage('Transação adicionada com sucesso!', 'success')
        } catch (error) {
            showFlashMessage(error.message, 'error')
        } finally {
            setCreatingTransaction(false)
        }
    }

    return(
        <Container>
            <CustomModal visible={visible} onClose={closeModal}>
                <View style={{flexDirection: 'row', justifyContent: 'center', gap: '12', marginBottom: 20}}>
                    <Button 
                        onPress={() => setIsInvoicing(true)}
                        buttonStyle={isInvoicing ? 'success' : 'outline'}
                    >
                        Entrada
                    </Button>
                    <Button 
                        onPress={() => setIsInvoicing(false)}
                        buttonStyle={!isInvoicing ? 'error' : 'outline'}
                    >
                        Saída
                    </Button>
                </View>

                <InputField
                    label="Título da transação"
                    value={title}
                    onChangeText={handleTitleChange}
                />

                

                <InputField
                    label="Categoria"
                    value={category}
                    onChangeText={handleCategoryChange}
                />

                <InputField
                    label="Valor"
                    value={value}
                    onChangeText={handleValueChange}
                    keyboardType="numeric"
                />
                <Button 
                    buttonStyle={'success'} 
                    size={'large'} 
                    flex 
                    onPress={() => addTransaction({amount: value, name: title, category, date: Timestamp.now()})}
                    loading={creatingTransaction}
                >
                    Criar Transação
                </Button>
            </CustomModal>

            <ContentBlock>
                <ContentHeader>
                    <Button 
                        buttonStyle={'primary'} 
                        onPress={() => openModal()}
                        icon={'add-circle'}
                    />
                </ContentHeader>
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
                    flex={true}
                    icon={'search'}
                    iconPosition={'left'}
                >
                Buscar
                </Button>
            </ContentBlock>

            <ContentBlock>
                {
                    loadingTransactions ? 
                    <ActivityIndicator /> :
                    <FlatList
                        data={transactions}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TransactionItem item={item}/>
                        )}
                    />
                }
            </ContentBlock>
        </Container>
    )
}