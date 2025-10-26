import { useTheme } from "styled-components";
import { getTextStyle, TextStyled } from "./style";

export function Text({children, variant = 'body', style, numLines, color, align}) {
    const theme = useTheme()

    return (
        <TextStyled
            style={[getTextStyle(theme, variant, color, align), style]}
            numberOfLines={numLines}
        >
            {children}
        </TextStyled>
    )
}