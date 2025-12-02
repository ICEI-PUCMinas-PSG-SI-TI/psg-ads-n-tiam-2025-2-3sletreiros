import { Button } from "@components/Button/Button";
import { CustomAnimation } from "@components/CustomAnimation/CustomAnimation";
import { EmptyList } from "@components/EmptyList/EmptyList";
import { ProductItem } from "@components/ProductItem/ProductItem";
import { Text } from "@components/Text/Text";
import { useProducts } from "@hooks/useProducts";
import { useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Container } from "src/styles/global";
import { ProductSelectionModal } from "./ProductSelectionModal/ProductSelectionModal";
import { formatToBRL } from "@utils/formatter";
import { useTheme } from "styled-components";

export function CreateSale() {
    const colorScheme = useColorScheme()
    const theme = useTheme()

    const [addedProducts, setAddedProducts] = useState([])

    const [selectingProduct, setSelectingProduct] = useState(false)

    const [total, setTotal] = useState(0)

    function handleConfirmProducts(selectedProducts) {
        setAddedProducts(prev => {
            const updated = [...prev]

            selectedProducts.forEach(product => {
                const exists = updated.find(p => p.id === product.id)

                if (exists) {
                    exists.quantity += 1
                } else {
                    updated.push({ ...product, quantity: product.quantity ?? 1 })
                }
            })

            return updated
        })
    }


    useEffect(() => {
        console.log(addedProducts)
        setTotal(() => {
            return addedProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
        })
    }, [addedProducts])

    return (
        <Container>
            <ProductSelectionModal
                isVisible={selectingProduct}
                onClose={() => setSelectingProduct(false)}
                onConfirm={handleConfirmProducts}
            />
            <View style={{alignItems: 'center', gap: 10, justifyContent: 'center'}}>
                <CustomAnimation name={'sale'} size={120}/>
                <Text>Lance novas vendas</Text>
            </View>
            
            <Button
                flex
                buttonStyle={colorScheme === 'dark' ? 'primary' : 'surface'}
                style={{marginTop: 10}}
                onPress={() => setSelectingProduct(true)}
            >
                Adicionar Produto
            </Button>

            <Text color={theme.colors.text.secondary} style={{marginTop: 15}}>Total do pedido: {formatToBRL(total)}</Text>

            <FlatList
                data={addedProducts}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <ProductItem item={item}/>
                )}
                ListEmptyComponent={<EmptyList message={'Nenhum produto adicionado ainda'} />}
            />
        </Container>
    )
}