import { useColorScheme } from "react-native";
import { Button, Container, Logo, Subtitle, TextButton } from "./style";

export function Home() {
    const deviceTheme = useColorScheme()

    return (
        <Container>
            {
                deviceTheme === 'light' ? 
                <Logo source={require('../../../assets/LogoHomeLight.png')} width={50} height={50}/> : 
                <Logo source={require('../../../assets/LogoHome.png')} width={50} height={50}/>
            }

            <Subtitle>Gerencie seu negócio, tome as melhores decisões.</Subtitle>

            <Button>
                <TextButton>Entrar</TextButton>
            </Button>

            <Button>
                <TextButton>Junte-se a nós</TextButton>
            </Button>
        </Container>
    )
}