import { ContentBlock } from "../../styles/global";
import { Text } from "@components/Text/Text";
import {  Pressable, TouchableOpacity, View } from "react-native";
import { AmountIndicator } from "@components/AmountIndicator/AmountIndicator";
import { Header, SecundaryText } from "./style";
import { formatDate } from "@utils/formatter";
import { Swipeable } from "react-native-gesture-handler";
import { useRef } from "react";
import { Animated } from "react-native";
import { Icon } from "@components/Icon/Icon";
import { useTheme } from "styled-components";

export function SaleItem({item, onDelete}) {
    const swipeableRef = useRef(null)
    const theme = useTheme()

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
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: '100%',
                    width: 80,
                    borderRadius: 8,
                    marginBottom: 12,
                    paddingTop: 4
                }}
            >
                <Animated.View style={{ transform: [{ scale }] }}>
                    <Icon name="delete" size={24} color={theme.colors.error.text} />
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
            <ContentBlock>
                <Header>
                    <Text variant="subtitle" style={{marginVertical: 5}}>{item.clientName}</Text>
                    <AmountIndicator amount={item.amount} isInvoicing={true}/>
                </Header>
                <ContentBlock  style={{flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end"}}>
                    <SecundaryText color={'#8C8C8C'} numLines={1}>
                        {formatDate(item.date)}    
                    </SecundaryText>
                </ContentBlock>
            </ContentBlock>
        </Swipeable>
    )
}