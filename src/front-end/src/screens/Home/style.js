import styled from "styled-components/native"

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background.default};
    justify-content: center;
    padding: 0 50px;
`

<<<<<<< Updated upstream
=======
export const Logo = styled.Image`
    align-self: center;
`

>>>>>>> Stashed changes
export const Subtitle = styled.Text`
    color: ${({ theme }) => theme.colors.text.primary};
    text-align: center;
`

export const Button = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.primary};
    margin-top: 30px;
    padding: 8px;
    border-radius: 12px;
`

export const TextButton = styled.Text`
    color: ${({ theme }) => theme.colors.buttonText};
    text-align: center;
`