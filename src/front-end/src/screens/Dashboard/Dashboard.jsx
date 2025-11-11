import { Image } from "react-native";
import { Container, ScrollContainer } from "../../styles/global";
import { Header, ProfileLogo } from "./style";
import { Text } from "../../components/Text/Text";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/Button/Button";
import { useNavigation } from '@react-navigation/native';

export function Dashboard() {
    const {user, logout, deleteAccount} = useAuth()
    const navigation = useNavigation();

    async function excludeAccount() {
      await deleteAccount()
    }

    return (
        <ScrollContainer>
            <Header>
                <ProfileLogo source={require('../../../assets/mock-logo.png')} width={10} height={10} resizeMode="contain"/>
                <Text>Olá, {user.displayName}!</Text>
            </Header>

            <Button 
            onPress={() => navigation.navigate('Financial_Transactions')}
            buttonStyle="primary"
            size="large"
            flex={true}
            >
              Movimentações financeiras
            </Button>

            <Button
              buttonStyle="primary"
              size="large"
              flex={true}
              onPress={logout}
            >
              Sair
            </Button>

            <Button
              buttonStyle="error"
              size="large"
              flex={true}
              onPress={deleteAccount}
            >
              Deletar conta
            </Button>
        </ScrollContainer>
    )
}