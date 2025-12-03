import { ScrollContainer } from "../../styles/global";
import { useAuth } from "@hooks/useAuth";
import { Button } from "@components/Button/Button";
import { Image, View } from "react-native";
import { GlassCard } from "@components/GlassCard/GlassCard";
import { Icon } from "@components/Icon/Icon";
import { Text } from "@components/Text/Text";
import { CardContent, CardTitle, MainValue, ValueContainer, Header, AccountInfo } from "@screens/Dashboard/style";
import { useTheme } from "styled-components";
import { useTransactions } from "@hooks/useTransactions";
import { formatToBRL } from "@utils/formatter";
import { useUser } from "@hooks/useUser";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSales } from "@hooks/useSales";

export function Dashboard() {
    const {currentMonthSales} = useSales()
    const {currentMonthTransactions} = useTransactions()
    const [finalValue, setFinalValue] = useState(currentMonthSales.total + currentMonthTransactions.total)
    const {userData} = useUser()
    const {logout} = useAuth()
    
    const theme = useTheme();

    const navigation = useNavigation()

    function resolveMainText(){
      if (finalValue === 0)
        return <MainValue theme={theme} style={{color: theme.colors.text.secondary}}>{formatToBRL(finalValue)}</MainValue>
      else if (finalValue > 0)
        return <MainValue theme={theme} style={{color: '#2ECC71'}}>{formatToBRL(finalValue)} </MainValue>
      else
        return <MainValue theme={theme} style={{color: theme.colors.error.text}}>{formatToBRL(finalValue)}</MainValue>
    }

    useEffect(() => {
      setFinalValue(currentMonthSales.total + currentMonthTransactions.total)
    }, [currentMonthSales, currentMonthTransactions])

    return (
        <ScrollContainer>
          <Header>
            <AccountInfo onPress={() => navigation.navigate('MyAccount')}>
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
                <CardTitle theme={theme}>Resumo {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</CardTitle>
                
                <ValueContainer>
                  {resolveMainText()}
                  {currentMonthSales.total !== 0 && 
                    <Icon 
                      family='Feather' 
                      size={24} 
                      name={finalValue > 0 ? 'trendingUp' : 'trendingDown'} 
                      color={finalValue > 0 ? '#2ECC71' : theme.colors.error.text}
                    />
                  }
                </ValueContainer>
              </CardContent>
            </GlassCard>
          </View>
        </ScrollContainer>
    )
}