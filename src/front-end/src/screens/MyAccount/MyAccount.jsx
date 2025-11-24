import { Text } from "../../components/Text/Text";
import { useAuth } from "../../hooks/useAuth";
import { Container } from "../../styles/global";
import { AccountInfo, Header, ActionButtonsContainer, Plan } from "./style";
import { Button } from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../hooks/useUser";
import { Icon } from "../../components/Icon/Icon";
import { useTheme } from "styled-components";
import { formatDate, formatCNPJ } from "../../utils/formatter";


export function MyAccount() {
    const {logout, deleteAccount} = useAuth()
    const {userData} = useUser()

    const navigation = useNavigation()

    if (!userData) return null;

    const {address} = userData

    return (
        <Container>
            <Header>
                <Text variant="title">Olá, {userData.name.split(' ')[0]} </Text>
                <Button buttonStyle={'error'} onPress={() => logout()} icon={'logout'} />
            </Header>
            <AccountInfo>
                <Button 
                    buttonStyle={'primary'} 
                    icon={userData.plan?.icon} 
                    onPress={() => navigation.navigate('SelectPlan')} 
                    flex={true}
                >
                    Plano {userData.plan?.name} 
                </Button>
                <Text>
                    <Text style={{fontWeight: 500}}>Razão social:</Text> {`${userData.social} - ${formatCNPJ(userData.cnpj)}`}
                </Text>
                <Text>
                    <Text style={{fontWeight: 500}}>Email:</Text> {userData.email}
                </Text>
                <Text>
                    <Text style={{fontWeight: 500}}>Membro desde:</Text> {formatDate(userData.createdAt)}
                </Text>
                {
                    address && 
                    <Text>
                        <Text style={{fontWeight: 500}}>Endereço:</Text> {`${address.street}, ${address.neighborhood} - ${address.city}`}
                    </Text>
                }
            </AccountInfo>
            <ActionButtonsContainer>
                <Button buttonStyle={'primary'} flex onPress={() => navigation.navigate('EditProfile')}>Editar Dados</Button>
                <Button buttonStyle={'error'} flex onPress={() => deleteAccount('Samuca10!')}>Excluir Conta</Button>
            </ActionButtonsContainer>
        </Container>
    )
}