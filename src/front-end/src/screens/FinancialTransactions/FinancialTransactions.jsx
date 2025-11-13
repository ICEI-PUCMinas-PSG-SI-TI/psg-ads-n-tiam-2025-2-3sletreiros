import { Container, ContentBlock } from "../../styles/global";
import { ContentHeader } from "./style";
import { Text } from "../../components/Text/Text";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input/InputField";
import { FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import { TransactionItem } from "../../components/TransactionItem/TransactionItem";
import { CustomModal } from "../../components/CustomModal/CustomModal";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../hooks/useAuth";
import { useFlashMessage } from "../../contexts/FlashMessageContext";


export function FinancialTransactions(){
    const {user} = useAuth()
    const [transactions, setTransactions] = useState([])
    const [filter, setFilter] = useState()

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [value, setValue] = useState("")

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
            if (!transaction.name || !transaction.category || !transaction.amount) throw new Error('Insira todos os campos.')

            const ref = collection(db, 'company', user.uid, 'transactions')

            await addDoc(ref, transaction)

            setTransactions((prev) => {
                return [transaction, ...prev]
            })
            
            closeModal()
            showFlashMessage('Transação adicionada com sucesso!', 'success')
        } catch (error) {
            showFlashMessage(error.message, 'error')
        }
        
    }

    function removeTransaction(id) {
        setTransactions((prev) => {return prev.filter(transaction => transaction.id !== id)})
    }

    useEffect(() => {
        async function loadTransactions() {
            try {
                const transactionsRef = collection(db, "company", user.uid, "transactions");
                const snapshot = await getDocs(transactionsRef);

                const transactionsList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));   
                
                setTransactions(transactionsList)
            } catch (error) {
                showFlashMessage('Erro ao carregar transações. Por favor, tente mais tarde.', 'error')
            }
        }

        if (user.uid) loadTransactions()
    }, [])

    return(
        <Container>
            <CustomModal visible={visible} onClose={closeModal}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 16}}>
                    <Text variant="subtitle">Cadastrar nova transação</Text>
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
                    onPress={() => addTransaction({amount: value, name: title, category, date: new Date().toLocaleDateString('pt-BR')})}
                >
                    Criar Transação
                </Button>
            </CustomModal>

            <ContentBlock>
                <ContentHeader>
                    <Button 
                        buttonStyle={'primary'} onPress={() => openModal()}
                        icon={'add-circle'}
                        iconPosition={'left'}
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
                <FlatList
                    data={transactions}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TransactionItem item={item} removeTransaction={removeTransaction}/>
                    )}
                />
            </ContentBlock>
        </Container>
    )
}