import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.default};
  padding: 30px 10px;
`


export const Logo = styled.Image`
    align-self: center;
`

export const ScrollContainer = styled.ScrollView`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background.default};
    padding: 30px 10px;
`

export const ContentBlock = styled.View`
    width: 100%;
    margin-bottom: 20px;  
`;