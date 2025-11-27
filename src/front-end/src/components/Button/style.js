import { useColorScheme } from "react-native";
import styled from "styled-components/native";

export const TouchableArea = styled.TouchableHighlight`
    align-self: ${({flex}) => flex ? 'auto' : 'flex-start'};
    border-radius: 16px;
`

export const Container = styled.View`
    justify-content: center;
    align-items: center;
    padding:  ${props => (props.size === 'large' ? '12' : '8')}px
    ${props => (props.size === 'large' ? '24' : '16')}px;
    border-radius: 8px;
`

export const ChildrenContainer = styled.View`
    display: flex;
    flex-direction: ${props => (props.iconPosition === 'left' ? 'row' : 'row-reverse')};;
    gap: 8px;
    justify-content: center;
    align-items: center;
`


export function getButtonColors(buttonStyle, theme) {
    switch(buttonStyle) {
        case 'primary':
            return {
                backgroundColor: theme.colors.primary,
                borderWidth: 2,
                borderColor: theme.colors.primary
            }
        case 'error':
            return {
                backgroundColor: theme.colors.error.background,
                borderWidth: 2, 
                borderColor: theme.colors.error.background
            }
        case 'success':
            return {
                backgroundColor: theme.colors.success.background,
                borderWidth: 2,
                borderColor: theme.colors.success.background
            }
        case 'outline':
            return {
                borderColor: theme.colors.primary,
                borderWidth: 1,
                borderRadius: 8
            }
        case 'surface':
            return {
                backgroundColor: theme.colors.background.surface,
                borderWidth: 2,
                borderColor: theme.colors.background.surface
            }
    }
}

export function getTextColor(buttonStyle, theme, colorScheme) {
    switch(buttonStyle) {
        case 'primary':
            return {
                color: theme.colors.buttonText,
            }
        case 'error':
            return {
                color: theme.colors.error.text,
            }
        case 'success':
            return {
                color: theme.colors.success.text,
            }
        case 'outline':
            return {
                color: theme.colors.primary
            }
        case 'surface':
            return {
                color: colorScheme === 'dark' ? theme.colors.text.primary : theme.colors.background.default
            }
    }
}