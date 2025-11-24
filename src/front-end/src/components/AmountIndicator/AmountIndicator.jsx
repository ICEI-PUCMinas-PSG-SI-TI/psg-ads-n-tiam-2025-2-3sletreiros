import { View } from "react-native";
import { Text } from "../Text/Text";
import { Icon } from "../Icon/Icon";
import { useTheme } from "styled-components";
import { formatToBRL } from "../../utils/formatter";

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
                {!isInvoicing ? `${formatToBRL(Math.abs(amount))}` : `${formatToBRL(Math.abs(amount))}`}
            </Text>
            <Icon
                name={isInvoicing ? 'arrowUp' : 'arrowDown'}
                color={!isInvoicing ? theme.colors.error.text : '#2ECC71'}
                size={18}
            />
        </View>
    )
}