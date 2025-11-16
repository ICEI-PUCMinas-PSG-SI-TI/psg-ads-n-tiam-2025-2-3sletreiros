import { ScrollContainer } from "../../styles/global";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/Button/Button";
import { useNavigation } from '@react-navigation/native';
import { View } from "react-native";
import { GlassCard } from "../../components/GlassCard/GlassCard";
import { Icon } from "../../components/Icon/Icon";
import { Text } from "../../components/Text/Text";
import { CardContent, CardTitle, MainValue, ProfitValue, ValueContainer } from './style';
import { useTheme } from "styled-components";
import { useTransactions } from "../../hooks/useTransactions";
import { formatToBRL } from "../../utils/formatter";

export function Dashboard() {
    const {logout, deleteAccount} = useAuth();
    const {currentMonthTransactions} = useTransactions()
    
    const theme = useTheme();
    const navigation = useNavigation();
    
    async function excludeAccount() {
      await deleteAccount()
    }

    return (
        <ScrollContainer>
            <View style={{gap: 16}}>
              <GlassCard>
                <CardContent>
                  <CardTitle theme={theme}>Resumo 11/2025</CardTitle>
                  
                  <ValueContainer>
                    <MainValue theme={theme}>{formatToBRL(currentMonthTransactions.total)}</MainValue>
                    <ProfitValue theme={theme}>
                      <Text color={'#2ECC71'}>R$ 20.248,67 </Text>
                      <Icon family='Feather' size={16} name={'trending-up'} color={'#2ECC71'}/>
                  </ProfitValue>
                  </ValueContainer>
                </CardContent>
              </GlassCard>
              <Button
              onPress={() => navigation.navigate('FinancialTransactions')}
              buttonStyle="primary"
              size="large"
              flex={true}
              >
                Movimentações financeiras
              </Button>
              <Button
                 onPress={() => navigation.navigate('MyAccount')}
                 buttonStyle="primary"
                 size="large"
                 flex={true}
              >
                Minha conta
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