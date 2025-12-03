import { Button } from "@components/Button/Button";
import { CustomAnimation } from "@components/CustomAnimation/CustomAnimation";
import { EmptyList } from "@components/EmptyList/EmptyList";
import { Text } from "@components/Text/Text";
import { useEffect, useState } from "react";
import { Image, useColorScheme, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Container } from "src/styles/global";
import { ProductSelectionModal } from "./ProductSelectionModal/ProductSelectionModal";
import { formatToBRL } from "@utils/formatter";
import { useTheme } from "styled-components";
import { ProductInfoContainer } from "./ProductSelectionModal/style";
import { Timestamp } from "firebase/firestore";
import { useSales } from "@hooks/useSales";
import { useFlashMessage } from "@hooks/useFlashMessage";
import { useNavigation } from "@react-navigation/native";

export function CreateSale() {
    const colorScheme = useColorScheme()
    const theme = useTheme()
    const { createSale } = useSales()
    const { showFlashMessage } = useFlashMessage()
    const navigation = useNavigation()

    const [addedProducts, setAddedProducts] = useState([])
    const [selectingProduct, setSelectingProduct] = useState(false)
    const [total, setTotal] = useState(0)

    const [creatingSale, setCreatingSale] = useState(false)

    function cleanList() {
        setAddedProducts([])
    }

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

    function handleIncrement(id) {
        setAddedProducts(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, quantity: (item.quantity || 1) + 1 }
            }
            return item
        }))
    }

    function handleDecrement(id) {
        setAddedProducts(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity - 1 }
                }
                return item
            })
            .filter(item => item.quantity > 0)
        })
    }

    async function addSale() {
        try {
            setCreatingSale(true)

            const items = addedProducts.map((orderItem) => {
                return {
                    ...orderItem,
                    amount: orderItem.quantity * orderItem.price
                }
            })

            const sale = {
                amount: total,
                items: items,
                date: Timestamp.now()
            }
            await createSale(sale)

            showFlashMessage('Venda lançada com sucesso!', 'success')

            if (navigation.canGoBack)
                navigation.goBack()
        } catch (error) {
            showFlashMessage(error.message || 'Erro ao lançar venda. Por favor, tente novamente.', 'error')
        } finally {
            setCreatingSale(false)
        }
    }

    useEffect(() => {
        setTotal(() => {
            return addedProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
        })
    }, [addedProducts])

    if (creatingSale) {
        return (
            <View style={{alignItems: 'center', gap: 10, justifyContent: 'center', flex: 1}}>
                <CustomAnimation name={'sale'} size={220}/>
            </View>
        )
    }

    return (
        <Container>
            <ProductSelectionModal
                isVisible={selectingProduct}
                onClose={() => setSelectingProduct(false)}
                onConfirm={handleConfirmProducts}
                addedProducts={addedProducts}
            />
            
            <View style={{flexDirection: 'row', gap: 12}}>
                <Button
                    fullWidth
                    flex
                    buttonStyle={colorScheme === 'dark' ? 'primary' : 'surface'}
                    style={{marginTop: 10}}
                    onPress={() => setSelectingProduct(true)}
                    icon={'addCircle'}
                >
                    Adicionar Produto
                </Button>
                <Button
                    fullWidth
                    flex
                    buttonStyle={'error'}
                    style={{marginTop: 10}}
                    onPress={() => cleanList()}
                    icon={'eraser'}
                >
                    Limpar Lista
                </Button>
            </View>

            <Text color={theme.colors.text.secondary} style={{marginVertical: 15}}>Total do pedido: {formatToBRL(total)}</Text>

            <FlatList
                data={addedProducts}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <ProductItem item={item} onIncrement={() => handleIncrement(item.id)} onDecrement={() => handleDecrement(item.id)}/>
                )}
                ListEmptyComponent={<EmptyList message={'Nenhum produto adicionado ainda'} />}
            />

            <Button
                buttonStyle={'success'}
                flex
                onPress={() => addSale()}
            >
                Lançar Venda
            </Button>
        </Container>
    )
}

function ProductItem({ item, onIncrement, onDecrement }) {
    return (
        <View>
            <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                padding: 10,
                gap: 12 
            }}>
                <Image
                    source={{ uri: item.image }}
                    style={{ width: 80, height: 80, borderRadius: 6, resizeMode: 'contain' }}
                />
                
                <ProductInfoContainer style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 4 }} numLines={1}>
                        {item.name}
                    </Text>
                
                    <Text color={'#b6b6b6ff'} numLines={1} style={{ fontSize: 12, marginBottom: 4 }}>
                        {item.description}
                    </Text>
                
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                        {formatToBRL(item.price)}
                    </Text>
                </ProductInfoContainer>
            </View>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <Button buttonStyle={'primary'} onPress={onDecrement}>-</Button>
                <Text>{item.quantity}</Text>
                <Button buttonStyle={'primary'} onPress={onIncrement}>+</Button>
            </View>
        </View>
    )
}