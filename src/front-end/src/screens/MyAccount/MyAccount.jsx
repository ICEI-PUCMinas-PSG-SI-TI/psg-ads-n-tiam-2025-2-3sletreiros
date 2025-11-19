import { View } from "react-native";
import { Text } from "../../components/Text/Text";
import { useAuth } from "../../hooks/useAuth";
import { Container } from "../../styles/global";
import { Header } from "./style";
import { Button } from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";


export function MyAccount() {
    const {user, logout} = useAuth()
    const navigation = useNavigation()

    return (
        <Container>
            <Header>
                <Text variant="subtitle">Olá, {user.displayName.split(' ')[0]}!</Text>
            </Header>

            <Button buttonStyle={'primary'} flex onPress={() => navigation.navigate('EditProfile')}>Editar dados</Button>
            <Button buttonStyle={'error'} flex onPress={() => logout()}>Sair</Button>
        </Container>
    )
}