import { Container } from "../../styles/global"
import { InputField } from "../../components/Input/InputField"
import { Button } from "../../components/Button/Button"
import { Text } from "../../components/Text/Text"
import { useState } from "react"
import { StockContainer } from "./style"
import { useNavigation } from "@react-navigation/native";
import { useFlashMessage } from "../../hooks/useFlashMessage";



export function CreateProduct(){
    const [name, setName] = useState("")
    const [stock, setStock] = useState(0)
    const [price, setPrice] = useState("")


    const navigation = useNavigation()
    const {showFlashMessage} = useFlashMessage()

    const handleNameChange = (text) => setName(text);

    const handleStockChange = (text) => {

        if (text === "") {
            setStock(0);
            return;
        }

        const numericValue = Number(text);

        setStock(numericValue);
    }

    const handlePriceChange = (text) => setPrice(text);

    function addProduct(){
        showFlashMessage('Produto adicionado com sucesso!', 'success')
        navigation.navigate('Products')
    }

    return(
        <Container>
            <Text variant="title" style={{marginTop: 20, marginBottom: 15}}>
                Criar produto
            </Text>

            <InputField
                label="Nome do produto"
                placeholder='Ex: produto Y'
                value={name}
                onChangeText={handleNameChange}
            /> 

            <StockContainer>

                <InputField
                    label="Estoque"
                    value={String(stock)}
                    style={{width: '100%'}}
                    onChangeText={handleStockChange}
                    keyboardType="numeric"
                /> 

            </StockContainer>
            
            <InputField
                label="Preço"
                value={price}
                placeholder='Ex: 1000'
                onChangeText={handlePriceChange}
                keyboardType="numeric"
            /> 

            <Button 
                buttonStyle={'primary'} 
                onPress={addProduct}
                
                style={{width:'100%', marginTop: 10}}
            >
                Criar produto
            </Button>

        </Container>
    )
}