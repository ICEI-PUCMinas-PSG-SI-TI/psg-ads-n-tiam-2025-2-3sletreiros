import { ScrollContainer } from "../../styles/global";
import { useAuth } from "@hooks/useAuth";
import { Button } from "@components/Button/Button";
import { Image, View } from "react-native";
import { GlassCard } from "@components/GlassCard/GlassCard";
import { Icon } from "@components/Icon/Icon";
import { Text } from "@components/Text/Text";
import { CardContent, CardTitle, MainValue, ProfitValue, ValueContainer, Header, AccountInfo } from "@screens/Dashboard/style";
import { useTheme } from "styled-components";
import { useTransactions } from "@hooks/useTransactions";
import { formatToBRL } from "@utils/formatter";
import { useUser } from "@hooks/useUser";

export function Dashboard() {
    const {currentMonthTransactions} = useTransactions()
    const {userData} = useUser()
    const {logout} = useAuth()
    
    const theme = useTheme();

    return (
        <ScrollContainer>
          <Header>
            <AccountInfo>
              {
                userData?.logo &&
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    source={{ uri: userData?.logo }}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'cover',
                    }}
                  />
                </View>
              }
              <Text>{userData?.social}</Text>
            </AccountInfo>

            <Button buttonStyle={'error'} onPress={() => logout()} icon={'logout'} />
          </Header>
          <View style={{gap: 16}}>
            <GlassCard>
              <CardContent>
                <CardTitle theme={theme}>Resumo 11/2025</CardTitle>
                
                <ValueContainer>
                  <MainValue theme={theme}>{formatToBRL(currentMonthTransactions.total)}</MainValue>
                  <ProfitValue theme={theme}>
                    <Text color={'#2ECC71'}>R$ 20.248,67 </Text>
                    <Icon family='Feather' size={16} name={'trendingUp'} color={'#2ECC71'}/>
                </ProfitValue>
                </ValueContainer>
              </CardContent>
            </GlassCard>
          </View>
        </ScrollContainer>
    )
}