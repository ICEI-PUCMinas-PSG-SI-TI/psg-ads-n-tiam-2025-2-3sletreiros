import { View } from "react-native";
import { Text } from "../Text/Text";
import { Icon } from "../Icon/Icon";
import { useTheme } from "styled-components";

export function AmountIndicator({amount, isInvoicing}){
    const theme = useTheme()

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                marginVertical: 5
            }}
        >
            <Text
                style={{
                    color: !isInvoicing ? theme.colors.error.text : '#2ECC71',
                    fontWeight: '600'
                }}
            >
                {!isInvoicing ? `- R$ ${Math.abs(amount)}` : `+ R$ ${amount}`}
            </Text>
            <Icon
                name={isInvoicing ? 'arrow-circle-up' : 'arrow-circle-down'}
                color={!isInvoicing ? theme.colors.error.text : '#2ECC71'}
                size={18}
            />
        </View>
    )
}