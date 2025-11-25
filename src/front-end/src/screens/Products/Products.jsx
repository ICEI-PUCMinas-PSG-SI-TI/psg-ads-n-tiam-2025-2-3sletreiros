import { InputField } from "../../components/Input/InputField";
import { ContentBlock } from "../../styles/global";
import { Button } from "../../components/Button/Button";
import { ContentHeader } from "../FinancialTransactions/style";
import { ProductItem } from "../../components/ProductItem/ProductItem";
import { CardsContainer } from "./style";
import { ScrollContainer } from "../../styles/global";
import { useNavigation } from "@react-navigation/native";


export function Products(){
    const navigation = useNavigation()
    const item = {name: 'Produto', stock: 5, price: 3500}
    
    return(
        
        <ScrollContainer>
            <ContentBlock>
                <ContentHeader>
                    <Button 
                        buttonStyle={'primary'} 
                        icon={'add-circle'}
                        onPress={() => navigation.navigate('CreateProduct')}
                        />
                    </ContentHeader>
                </ContentBlock>
            <InputField
                label="Nome do produto"
                placeholder='Ex.: bola'
            /> 
            <CardsContainer>
                <ProductItem item={item}/>
                <ProductItem item={item}/>
                <ProductItem item={item}/>
                <ProductItem item={item}/>
                <ProductItem item={item}/>
                <ProductItem item={item}/>
            </CardsContainer>
            
        </ScrollContainer>
            
    )
    
}