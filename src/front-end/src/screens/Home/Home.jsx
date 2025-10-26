import { useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Container, Logo, Subtitle, TextButton } from "./style";
import { NotLoggedLogo } from "../../styles/global";

export function Home() {
    const deviceTheme = useColorScheme()

    const navigation = useNavigation()

    return (
        <Container>
            {
                deviceTheme === 'light' ? 
                <NotLoggedLogo source={require('../../../assets/LogoHomeLight.png')} width={50} height={50}/> : 
                <NotLoggedLogo source={require('../../../assets/LogoHome.png')} width={50} height={50}/>
            }

            <Subtitle>Gerencie seu negócio, tome as melhores decisões.</Subtitle>

            <Button>
                <TextButton>Entrar</TextButton>
            </Button>

            <Button onPress={() => navigation.navigate('Cadastro')}>
                <TextButton>Junte-se a nós</TextButton>
            </Button>
        </Container>
    )
}