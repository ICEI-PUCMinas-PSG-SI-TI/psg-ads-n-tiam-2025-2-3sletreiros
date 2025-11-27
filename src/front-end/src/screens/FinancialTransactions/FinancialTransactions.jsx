import { Container, ContentBlock } from "../../styles/global";
import { ContentHeader } from "./style";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input/InputField";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import { TransactionItem } from "../../components/TransactionItem/TransactionItem";
import { CustomModal } from "../../components/CustomModal/CustomModal";
import { useFlashMessage } from "../../hooks/useFlashMessage";
import { Timestamp } from "firebase/firestore";
import { useTransactions } from "../../hooks/useTransactions";
import { Icon } from "../../components/Icon/Icon";
import { useTheme } from "styled-components";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "../../utils/formatter";
import { EmptyList } from "../../components/EmptyList/EmptyList";

export function FinancialTransactions(){
    const {transactions, loadingTransactions, createTransaction} = useTransactions()
    const [filteredTransactions, setFilteredTransactions] = useState(transactions)
    const theme = useTheme()

    const [filter, setFilter] = useState()

    const [creatingTransaction, setCreatingTransaction] = useState(false)

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [value, setValue] = useState("")
    const [isInvoicing, setIsInvoicing] = useState(true)

    const [initialDate, setInitialDate] = useState(new Date())
    const [openInitialDate, setOpenInitialDate] = useState()
    const [finalDate, setFinalDate] = useState(new Date())
    const [openFinalDate, setOpenFinalDate] = useState()

    const [hasChosenInitial, setHasChosenInitital] = useState(false)    
    const [hasChosenFinal, setHasChosenFinal] = useState(false)    

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

    function filterByDateRange() {
        let result = transactions;

        if (hasChosenInitial && hasChosenFinal) {
            const start = new Date(initialDate.setHours(0,0,0,0));
            const end = new Date(finalDate.setHours(23,59,59,999));

            result = result.filter(t => {
                const tDate = t.date.toDate();
                return tDate >= start && tDate <= end;
            });
        }

        if (filter && filter.trim() !== "") {
            const lowered = filter.toLowerCase();
            result = result.filter(t =>
                t.name.toLowerCase().includes(lowered)
            );
        }

        setFilteredTransactions(result);
    }

    function cleanFilters() {
        setHasChosenFinal(false)
        setHasChosenInitital(false)
        setFilter("")
    }

    useEffect(() => {
        filterByDateRange();
    }, [initialDate, finalDate, transactions, filter]);

    return(
        <Container>
            <CustomModal visible={visible} onClose={closeModal}>
                <View style={{flexDirection: 'row', justifyContent: 'center', gap: '12', marginBottom: 20}}>
                    <Button 
                        onPress={() => setIsInvoicing(true)}
                        buttonStyle={isInvoicing ? 'success' : 'outline'}
                        iconFamily={'Feather'}
                        icon={'trendingUp'}
                    >
                        Entrada
                    </Button>
                    <Button 
                        onPress={() => setIsInvoicing(false)}
                        buttonStyle={!isInvoicing ? 'error' : 'outline'}
                        iconFamily={'Feather'}
                        icon={'trendingDown'}
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
                    buttonStyle={'primary'} 
                    size={'large'} 
                    flex
                    onPress={() => addTransaction({amount: value, name: title, category, date: Timestamp.now(), type: isInvoicing ? 'invoice' : 'expense'})}
                    loading={creatingTransaction}
                >
                    <Icon name={'done'} color={theme.colors.success.text}/>
                </Button>
            </CustomModal>

            <ContentBlock>
                <ContentHeader>
                    <Button 
                        buttonStyle={'primary'} 
                        onPress={() => openModal()}
                        icon={'addCircle'}
                    />
                </ContentHeader>
            </ContentBlock>

            <ContentBlock>
                <InputField
                    label={'Filtrar transações'}
                    placeholder="Pesquisar"
                    value={filter}
                    onChangeText={(text) => {
                        setFilter(text)
                        const lowered = text.toLowerCase()
                        setFilteredTransactions(
                            transactions.filter(t => t.name.toLowerCase().includes(lowered))
                        )
                    }}
                    themeVariant="dark"
                />

                <View style={{flexDirection: 'row', gap: 10}}>
                    <Button 
                        onPress={() => setOpenInitialDate(true)} 
                        buttonStyle={!hasChosenInitial ? "surface" : "primary"}
                        icon={"calendar"}
                        iconPosition={"left"}
                    >
                        {!hasChosenInitial ? 'Início' : formatDate(initialDate)}
                    </Button>
                    <Button 
                        onPress={() => setOpenFinalDate(true)} 
                        buttonStyle={!hasChosenFinal ? "surface" : "primary"}
                        icon={"calendar"}
                        iconPosition={"left"}
                    >
                        {!hasChosenFinal ? 'Final' : formatDate(finalDate)}
                    </Button>
                    <Button buttonStyle={"surface"} icon={'eraser'} onPress={cleanFilters}/>
                </View>

                

                {openInitialDate && (
                    <DateTimePicker
                        value={initialDate}
                        mode="date"
                        display="calendar"
                        onChange={(event, selected) => {
                            setOpenInitialDate(false);
                            if (selected) {
                                setInitialDate(selected)
                                setHasChosenInitital(true)
                            }
                        }}
                    />
                )}

                {openFinalDate && (
                    <DateTimePicker
                        value={finalDate}
                        mode="date"
                        display="calendar"
                        onChange={(event, selected) => {
                            setOpenFinalDate(false);
                            if (selected) {
                                setFinalDate(selected)
                                setHasChosenFinal(true)
                            }
                        }}
                    />
                )}
            </ContentBlock>

            <ContentBlock>
                {
                    loadingTransactions ? 
                    <ActivityIndicator /> :
                    <FlatList
                        data={filteredTransactions}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TransactionItem item={item}/>
                        )}
                        ListEmptyComponent={<EmptyList message={'Nenhuma transação encontrada.'} />}
                    />
                }
            </ContentBlock>
        </Container>
    )
}