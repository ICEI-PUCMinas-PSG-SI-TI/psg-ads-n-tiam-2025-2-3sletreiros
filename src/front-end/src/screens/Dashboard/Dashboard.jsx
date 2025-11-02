import { Image } from "react-native";
import { Container, ScrollContainer } from "../../styles/global";
import { Header, ProfileLogo } from "./style";
import { Text } from "../../components/Text/Text";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/Button/Button";

export function Dashboard() {
    const {user, logout} = useAuth()

    return (
        <ScrollContainer>
            <Header>
                <ProfileLogo source={require('../../../assets/mock-logo.png')} width={10} height={10} resizeMode="contain"/>
                <Text>Olá, {user.displayName}!</Text>
            </Header>
            <Button
            buttonStyle="primary"
            size="large"
            flex={true}
            onPress={logout}
          >
            Sair
          </Button>
        </ScrollContainer>
    )
}