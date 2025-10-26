import { useColorScheme } from "react-native";
<<<<<<< Updated upstream
import { useNavigation } from "@react-navigation/native";
import { Button, Container, Logo, Subtitle, TextButton } from "./style";
import { NotLoggedLogo } from "../../styles/global";
=======
import { Button, Container, Logo, Subtitle, TextButton } from "./style";
>>>>>>> Stashed changes

export function Home() {
    const deviceTheme = useColorScheme()

<<<<<<< Updated upstream
    const navigation = useNavigation()

=======
>>>>>>> Stashed changes
    return (
        <Container>
            {
                deviceTheme === 'light' ? 
<<<<<<< Updated upstream
                <NotLoggedLogo source={require('../../../assets/LogoHomeLight.png')} width={50} height={50}/> : 
                <NotLoggedLogo source={require('../../../assets/LogoHome.png')} width={50} height={50}/>
=======
                <Logo source={require('../../../assets/LogoHomeLight.png')} width={50} height={50}/> : 
                <Logo source={require('../../../assets/LogoHome.png')} width={50} height={50}/>
>>>>>>> Stashed changes
            }

            <Subtitle>Gerencie seu negócio, tome as melhores decisões.</Subtitle>

            <Button>
                <TextButton>Entrar</TextButton>
            </Button>

<<<<<<< Updated upstream
            <Button onPress={() => navigation.navigate('Cadastro')}>
=======
            <Button>
>>>>>>> Stashed changes
                <TextButton>Junte-se a nós</TextButton>
            </Button>
        </Container>
    )
}