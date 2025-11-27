import { ActivityIndicator, useColorScheme } from "react-native";
import { useTheme } from "styled-components";
import { ChildrenContainer, Container, getButtonColors, getTextColor, TouchableArea } from "./style";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text/Text";


export function Button({children, buttonStyle, onPress, loading, flex, size, icon, iconPosition, iconFamily, disabled, style, iconSize = 18}) {
    const theme = useTheme()
    const colorScheme = useColorScheme()

    return (
        <TouchableArea
            flex={flex}
            onPress={onPress}
            disabled={disabled}
            style={style}
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