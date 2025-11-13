import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { ChildrenContainer, Container, getButtonColors, getTextColor, TouchableArea } from "./style";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text/Text";


export function Button({children, buttonStyle, onPress, loading, flex, size, icon, iconPosition, disabled, style, iconSize = 20}) {
    const theme = useTheme()

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
                    loading && <ActivityIndicator color={theme.colors.buttonText}/>
                }
                <ChildrenContainer iconPosition={iconPosition}>
                    {
                        icon && !loading && <Icon name={icon} color={theme.colors.buttonText} size={iconSize}/>
                    }
                    {children && !loading &&
                        <Text style={[getTextColor(buttonStyle, theme)]}>
                            {children}
                        </Text>
                    }
                </ChildrenContainer>
            </Container>
        </TouchableArea>
    )
}