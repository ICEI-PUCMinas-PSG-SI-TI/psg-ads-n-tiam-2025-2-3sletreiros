import { Container } from "../../styles/global"
import { InputField } from "../../components/Input/InputField"
import { Button } from "../../components/Button/Button"
import { Text } from "../../components/Text/Text"
import { useState } from "react"
import { StockContainer } from "./style"
import { useNavigation } from "@react-navigation/native";
import { useFlashMessage } from "../../hooks/useFlashMessage";



export function CreateProduct(){
    const [stock, setStock] = useState(0)
    const navigation = useNavigation()
    const {showFlashMessage} = useFlashMessage()

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
                placeholder='Ex.: produto Y'
            /> 

            <StockContainer>
                <Text variant="subtitle">Estoque</Text>
                <Button 
                    buttonStyle={'primary'} 
                    icon={'remove-circle'}
                    onPress={() => setStock(stock > 0 ? stock - 1 : 0)}
                />
                <Text variant="title">{stock}</Text>
                <Button 
                    buttonStyle={'primary'} 
                    icon={'add-circle'}
                    onPress={() => setStock(stock + 1)}
                />
            </StockContainer>
            
            <InputField
                label="Preço"
                placeholder='Ex.: 3500'
            /> 

            <Button 
            buttonStyle={'primary'} 
            onPress={() => addProduct()}
            
            style={{width:'100%', marginTop: 10}}
            >
                Criar produto
            </Button>

        </Container>
    )
}