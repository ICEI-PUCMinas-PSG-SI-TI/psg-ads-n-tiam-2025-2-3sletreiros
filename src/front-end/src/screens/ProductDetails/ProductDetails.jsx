import { useRoute, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";

import { useState, useEffect } from "react";
import { doc, getDoc , updateDoc} from "firebase/firestore";
import { db } from "../../config/firebase";

import { Container, ScrollContainer } from "src/styles/global";
import { Text } from "@components/Text/Text";
import { InputField } from "../../components/Input/InputField";
import { Box,  ButtonContainer } from "@screens/TransactionDetails/style";
import { useFlashMessage } from "../../hooks/useFlashMessage";
import { Button } from "../../components/Button/Button";

export function ProductDetails(){
    const { user } = useAuth();
    
    const route = useRoute()
    const { productId } = route.params;
    const navigation = useNavigation();

    const [product, setProduct] = useState();

    const [name, setName] = useState("");
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    
    const { showFlashMessage } = useFlashMessage();

    async function getProduct() {
        try{
            const productRef = doc(db, "company", user?.uid, "products", productId);

            const snapshot = await getDoc(productRef);

            if (snapshot.exists()) {
                const data = snapshot.data();

                setProduct({ id: snapshot.id, ...data });

                setName(data.name || "");
                setStock(data.stock || "");
                setPrice(String(data.price || ""));
                setDescription(data.description || "");
                setCategory(data.category || "");

            }
            else {
                console.log("Produto não encontrado");
            }
        } catch(error){
            console.error("Erro ao buscar transação:", error);
        }
    }

    useEffect(() => {
        getProduct();
    }, []);

    async function updateProcuct() {
            try {
                const productRef = doc(
                    db,
                    "company",
                    user.uid,
                    "products",
                    productId
                );
    
                await updateDoc(productRef, {
                    name,
                    stock,
                    price: Number(price),
                    description,
                    category,
                });
    
                      
                showFlashMessage("Dados atualizados com sucesso!", "success");
                navigation.goBack();
            } catch (error) {
                showFlashMessage("Erro ao atualizar produto", "error");
                console.error("Erro ao atualizar produto:", error);
            }
        }

    return (
        <ScrollContainer>
            <Text variant="title">Detalhes do produto</Text>

            <Container>
                <InputField 
                    label="Nome do produto" 
                    value={name}
                    onChangeText={setName}
                />

                <InputField 
                    label="Estoque"
                    value={stock}
                    onChangeText={setStock}
                />

                <InputField 
                    label="Valor da transação"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                />

                <InputField 
                    label="Categoria do produto"
                    value={category}
                    onChangeText={setCategory}
                />

                <InputField 
                    label="Descrição do produto"
                    value={description}
                    onChangeText={setDescription}
                />

                <ButtonContainer>
                    <Button buttonStyle={"primary"} flex onPress={updateProcuct}>
                        Salvar
                    </Button>
                
                    <Button
                        buttonStyle={"outline"}
                        flex
                        onPress={() => navigation.goBack()}
                    >
                        Cancelar
                    </Button>
                </ButtonContainer>

                

            </Container>
        </ScrollContainer>
    )

    
} 


/**
 * 
 * 
 * 
 * ef);]
 LOG  {"category": "Eletrônicos ", "description": "
Para computador ", "id": "4I2TkrQ1tz6XUrnCDh65", "i
mage": "https://res.cloudinary.com/duxksghsb/image/
upload/v1764334426/oudtvbk9aubjb6cagoba.jpg", "name
": "Mouse ", "price": "100", "stock": "1"}
 */