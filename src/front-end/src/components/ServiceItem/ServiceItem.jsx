import { Text } from "@components/Text/Text";
import { View, Animated, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components";
import { Swipeable } from "react-native-gesture-handler";
import { Icon } from "@components/Icon/Icon";
import { useRef } from "react";
import { formatToBRL } from "@utils/formatter";

export function ServiceItem({ item, onDelete }) {
    const theme = useTheme()
    const swipeableRef = useRef(null)

    const renderRightActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        return (
            <TouchableOpacity
                onPress={() => {
                    swipeableRef.current?.close()
                    onDelete(item)
                }}
                style={{
                    backgroundColor: theme.colors.error,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 80,
                    borderRadius: 8,
                    marginBottom: 12,
                }}
            >
                <Animated.View style={{ transform: [{ scale }] }}>
                    <Icon name="delete" size={24} color="#fff" />
                </Animated.View>
            </TouchableOpacity>
        );
    };

    return (
        <Swipeable
            ref={swipeableRef}
            renderRightActions={renderRightActions}
            overshootRight={false}
            friction={2}
        >
            <View style={{
                backgroundColor: theme.colors.background.surface,
                padding: 16,
                borderRadius: 8,
                marginBottom: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <View style={{ flex: 1 }}>
                    <Text variant="title" style={{ marginBottom: 4 }}>
                        {item.name}
                    </Text>
                    {item.description ? (
                        <Text variant="body" style={{ color: theme.colors.text.secondary }}>
                            {item.description}
                        </Text>
                    ) : null}
                </View>
                <Text variant="title" style={{ color: theme.colors.primary }}>
                    {formatToBRL(item.price)}
                </Text>
            </View>
        </Swipeable>
    )
}
