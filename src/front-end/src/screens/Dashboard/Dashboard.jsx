import { ScrollContainer } from "../../styles/global";
import { useAuth } from "@hooks/useAuth";
import { Button } from "@components/Button/Button";
import { useNavigation } from '@react-navigation/native';
import { View } from "react-native";
import { GlassCard } from "@components/GlassCard/GlassCard";
import { Icon } from "@components/Icon/Icon";
import { Text } from "@components/Text/Text";
import { CardContent, CardTitle, MainValue, ProfitValue, ValueContainer } from "@screens/Dashboard/style";
import { useTheme } from "styled-components";
import { useTransactions } from "@hooks/useTransactions";
import { formatToBRL } from "@utils/formatter";

export function Dashboard() {
    const {currentMonthTransactions} = useTransactions()
    
    const theme = useTheme();

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
                      <Icon family='Feather' size={16} name={'trendingUp'} color={'#2ECC71'}/>
                  </ProfitValue>
                  </ValueContainer>
                </CardContent>
              </GlassCard>
            </View>
        </ScrollContainer>
    )
}