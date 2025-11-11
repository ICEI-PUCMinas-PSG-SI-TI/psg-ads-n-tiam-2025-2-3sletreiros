import { ActivityIndicator, Text } from "react-native";
import { useTheme } from "styled-components";
import { ChildrenContainer, Container, getButtonColors, getTextColor, TouchableArea } from "./style";
import { Icon } from "../Icon/Icon";


export function Button({children, buttonStyle, onPress, loading, flex, size, icon, iconPosition, disabled}) {
    const theme = useTheme()

    return (
        <TouchableArea
            flex={flex}
            onPress={onPress}
            disabled={disabled}
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
                        icon && !loading && <Icon name={icon} color={theme.colors.buttonText}/>
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