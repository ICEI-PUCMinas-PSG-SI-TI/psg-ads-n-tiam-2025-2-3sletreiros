import styled from "styled-components/native";


export const TextStyled = styled.Text`

`

export function getTextStyle(theme, variant, color, align) {
    const baseColor = color || theme.colors.text.primary;

    switch (variant) {

        case "title":
            return {
                color: baseColor,
                fontSize: 22,
                fontWeight: "700",
                textAlign: align
            };

        case "subtitle":
            return {
                color: baseColor,
                fontSize: 18,
                fontWeight: "500",
                textAlign: align
            };

        case "body":

        default:
            return {
                color: baseColor,
                fontSize: 14,
                fontWeight: "400",
                textAlign: align
            };
    }
}