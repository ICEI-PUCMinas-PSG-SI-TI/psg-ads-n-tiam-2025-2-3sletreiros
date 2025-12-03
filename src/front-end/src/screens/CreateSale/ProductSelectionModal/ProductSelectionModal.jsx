import { FlatList, Image, Modal, View } from "react-native";
import { Card, CenterContainer, ModalContent, Overlay, ProductInfoContainer } from "./style";
import { useProducts } from "@hooks/useProducts";
import { Text } from "@components/Text/Text";
import { formatToBRL } from "@utils/formatter";
import { useState } from "react";
import { Button } from "@components/Button/Button";

export function ProductSelectionModal({isVisible, onClose, onConfirm, addedProducts = []}) {
    const {products} = useProducts()

    const [selectedProducts, setSelectedProducts] = useState([])

    function toggleSelect(product) {
        setSelectedProducts(prev => {
            const exists = prev.find(p => p.id === product.id)
            if (exists) {
                return prev.filter(p => p.id !== product.id)
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    function handleConfirm() {
        onConfirm(selectedProducts)
        setSelectedProducts([]) 
        onClose()
    }

    return (
        <Modal
            visible={isVisible}
            onRequestClose={onClose}
            transparent
        >
            <Overlay onPress={onClose}>
                <CenterContainer>
                    <ModalContent>
                        <Text align={'center'} style={{marginBottom: 20}}>Selecione os produtos do pedido</Text>
                        <FlatList
                            data={products}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => {
                                const isAlreadyAdded = addedProducts.some(p => p.id === item.id)
                                return (
                                    <ProductItem 
                                        item={item}
                                        selected={!!selectedProducts.find(p => p.id === item.id)}
                                        disabled={isAlreadyAdded}
                                        onPress={() => !isAlreadyAdded && toggleSelect(item)}
                                    />
                                )
                            }}
                        />

                         <Button
                            style={{ marginTop: 20 }}
                            disabled={selectedProducts.length === 0}
                            onPress={handleConfirm}
                            buttonStyle={'success'}
                            flex
                        >
                            Confirmar Seleção
                        </Button>
                    </ModalContent>
                </CenterContainer>
            </Overlay>
        </Modal>
    )
}

function ProductItem({ item, selected, onPress, disabled }) {
    return (
        <Card
            selected={selected}
            onTouchEnd={onPress}
            style={{ opacity: disabled ? 0.5 : 1 }}
        >
            <Image source={{uri: item.image}} style={{ width: 90, height: 90, borderRadius: 8, resizeMode: 'contain' }}/>
            <ProductInfoContainer>
                <Text style={{ marginBottom: 8}}>{item.name}</Text>
                <Text color={'#b6b6b6ff'} numLines={1} style={{fontSize: 12}}>{(item.description)}</Text>
                <Text color={'#b6b6b6ff'} style={{fontSize: 10}}>{formatToBRL(item.price)}</Text>
                <Text color={'#b6b6b6ff'} style={{fontSize: 10}}>Estoque: {item.stock}</Text>
            </ProductInfoContainer>
        </Card>
    )
}