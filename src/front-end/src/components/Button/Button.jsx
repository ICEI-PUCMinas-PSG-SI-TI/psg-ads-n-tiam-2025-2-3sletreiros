import { ActivityIndicator, useColorScheme } from "react-native";
import { useTheme } from "styled-components";
import { ChildrenContainer, Container, getButtonColors, getTextColor, TouchableArea } from "@components/Button/style";
import { Icon } from "@components/Icon/Icon";
import { Text } from "@components/Text/Text";


export function Button({
    children, 
    buttonStyle, 
    onPress, 
    loading, 
    flex, 
    size, 
    icon, 
    iconPosition, 
    iconFamily, 
    disabled, 
    style, 
    iconSize = 18, 
    fullWidth = false
}) {
    const theme = useTheme()
    const colorScheme = useColorScheme()

    return (
        <TouchableArea
            flex={flex}
            onPress={onPress}
            disabled={disabled}
            style={style}
            fullWidth={fullWidth}
        >
            <Container
                style={[getButtonColors(buttonStyle, theme)]}
                size={size}
            >
                {
                    loading && <ActivityIndicator color={getTextColor(buttonStyle, theme).color}/>
                }
                <ChildrenContainer iconPosition={iconPosition}>
                    {
                        icon && !loading && <Icon name={icon} color={getTextColor(buttonStyle, theme, colorScheme).color} size={iconSize} family={iconFamily}/>
                    }
                    {children && !loading &&
                        <Text style={[getTextColor(buttonStyle, theme, colorScheme)]}>
                            {children}
                        </Text>
                    }
                </ChildrenContainer>
            </Container>
        </TouchableArea>
    )
}