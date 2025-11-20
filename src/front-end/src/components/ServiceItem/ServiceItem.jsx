import { View, Animated, PanResponder } from "react-native";
import { Text } from "../Text/Text";
import { Icon } from "../Icon/Icon";
import { useTheme } from "styled-components";
import { useState, useRef } from "react";
import { DeleteButton, ServiceItemContainer } from "./style";

export function ServiceItem({ item, onDelete }) {
    const theme = useTheme();
    const [isDeleting, setIsDeleting] = useState(false);
    const translateX = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                // Só ativa se arrastar horizontalmente
                return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
            },
            onPanResponderMove: (_, gestureState) => {
                // Só permite arrastar para a esquerda (valores negativos)
                if (gestureState.dx < 0) {
                    translateX.setValue(gestureState.dx);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                // Se arrastou mais de 80px, mostra o botão de deletar
                if (gestureState.dx < -80) {
                    Animated.spring(translateX, {
                        toValue: -80,
                        useNativeDriver: true,
                    }).start();
                    setIsDeleting(true);
                } else {
                    // Volta para a posição original
                    Animated.spring(translateX, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                    setIsDeleting(false);
                }
            },
        })
    ).current;

    const handleDelete = () => {
        Animated.timing(translateX, {
            toValue: -500,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            onDelete(item.id);
        });
    };

    return (
        <View style={{ marginBottom: 8, position: "relative" }}>
            {/* Botão de deletar que fica atrás */}
            {isDeleting && (
                <DeleteButton onPress={handleDelete}>
                    <Icon name="delete" color="#fff" size={24} />
                </DeleteButton>
            )}

            {/* Item que pode ser arrastado */}
            <Animated.View
                style={{
                    transform: [{ translateX }],
                }}
                {...panResponder.panHandlers}
            >
                <ServiceItemContainer backgroundColor={theme.colors.input.background}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flex: 1 }}>
                            <Text size={16} weight="bold" style={{ marginBottom: 4 }}>
                                {item.name}
                            </Text>
                            {item.description ? (
                                <Text size={14} color={theme.colors.text.secondary}>
                                    {item.description}
                                </Text>
                            ) : null}
                        </View>
                        <Text size={16} weight="bold">
                            {item.formattedPrice}
                        </Text>
                    </View>
                </ServiceItemContainer>
            </Animated.View>
        </View>
    );
}
