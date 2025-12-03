import { useRoute, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

import { Container, ScrollContainer } from "src/styles/global";
import { Text } from "@components/Text/Text";
import { Box, ButtonContainer } from "@screens/TransactionDetails/style";
import { Button } from "../../components/Button/Button";

export function ProductDetails() {
    const { user } = useAuth();
    
    const route = useRoute();
    const { productId } = route.params;
    const navigation = useNavigation();

    const [product, setProduct] = useState();

    async function getProduct() {
        try {
            const productRef = doc(db, "company", user?.uid, "products", productId);
            const snapshot = await getDoc(productRef);

            if (snapshot.exists()) {
                setProduct({ id: snapshot.id, ...snapshot.data() });
            } else {
                console.log("Produto não encontrado");
            }
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
        }
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <ScrollContainer>
            <Text variant="title">Detalhes do produto</Text>

            <Container>

                <Box>
                    <Text variant="subtitle">Nome:</Text>
                    <Text>{product?.name}</Text>
                </Box>

                <Box>
                    <Text variant="subtitle">Estoque:</Text>
                    <Text>{product?.stock}</Text>
                </Box>

                <Box>
                    <Text variant="subtitle">Preço:</Text>
                    <Text>R$ {product?.price}</Text>
                </Box>

                <Box>
                    <Text variant="subtitle">Categoria:</Text>
                    <Text>{product?.category}</Text>
                </Box>

                <Box>
                    <Text variant="subtitle">Descrição:</Text>
                    <Text>{product?.description}</Text>
                </Box>

                <ButtonContainer style={{marginTop: 20}}>
                    <Button 
                        buttonStyle={"primary"} 
                        flex 
                        onPress={() => navigation.navigate('EditProduct', { productId })}
                    >
                        Editar
                    </Button>
                
                    <Button
                        buttonStyle={"outline"}
                        flex
                        onPress={() => navigation.goBack()}
                    >
                        Voltar
                    </Button>
                </ButtonContainer>

            </Container>
        </ScrollContainer>
    );
}
