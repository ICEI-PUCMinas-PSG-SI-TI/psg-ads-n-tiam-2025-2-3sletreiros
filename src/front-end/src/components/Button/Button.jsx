import { ActivityIndicator, Text } from "react-native";
import { useTheme } from "styled-components";
import { Container, getButtonColors, getTextColor, TouchableArea } from "./style";


export function Button({children, buttonStyle, onPress, loading, flex, size}) {
    const theme = useTheme()

    return (
        <TouchableArea
            flex={flex}
            onPress={onPress}
        >
            <Container
                style={[getButtonColors(buttonStyle, theme)]}
                size={size}
            >
                {
                    loading && <ActivityIndicator color={theme.colors.buttonText}/>
                }
                {children && !loading &&
                    <Text style={[getTextColor(buttonStyle, theme)]}>
                        {children}
                    </Text>
                }
            </Container>
        </TouchableArea>
    )
}