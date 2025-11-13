import {  ScrollContainer } from "../../styles/global";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/Button/Button";
import { useNavigation } from '@react-navigation/native';
import { View } from "react-native";

export function Dashboard() {
    const {logout, deleteAccount} = useAuth()
    const navigation = useNavigation();
    

    async function excludeAccount() {
      await deleteAccount()
    }

    return (
        <ScrollContainer>

            <View style={{gap: 16}}>
              <Button
              onPress={() => navigation.navigate('FinancialTransactions')}
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
                onPress={() => excludeAccount()}
              >
                Deletar conta
              </Button>
            </View>
        </ScrollContainer>
    )
}