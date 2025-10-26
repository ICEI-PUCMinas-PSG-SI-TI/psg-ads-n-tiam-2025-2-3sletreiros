import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background.default};
    padding: 50px 10px;
`

export const NotLoggedLogo = styled.Image`
    align-self: center;
`