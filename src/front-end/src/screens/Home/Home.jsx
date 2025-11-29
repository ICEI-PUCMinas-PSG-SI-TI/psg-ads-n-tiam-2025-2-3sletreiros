import { useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Container, Logo, Subtitle, TextButton } from "@screens/Home/style";
import { NotLoggedLogo } from "@components/NotLoggedLogo/NotLoggedLogo";

export function Home() {
    const deviceTheme = useColorScheme()

    const navigation = useNavigation()

    return (
        <Container>
            <NotLoggedLogo />

            <Subtitle>Gerencie seu negócio, tome as melhores decisões.</Subtitle>

            <Button onPress={() => navigation.navigate('Login')}>
                <TextButton>Entrar</TextButton>
            </Button>

            <Button onPress={() => navigation.navigate('Cadastro')}>
                <TextButton>Junte-se a nós</TextButton>
            </Button>
        </Container>
    )
}