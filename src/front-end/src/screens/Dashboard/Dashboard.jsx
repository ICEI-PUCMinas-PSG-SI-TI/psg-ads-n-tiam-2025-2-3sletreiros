import { ScrollContainer } from "../../styles/global";
import { useAuth } from "@hooks/useAuth";
import { Button } from "@components/Button/Button";
import { Image, View, TouchableOpacity } from "react-native";
import { GlassCard } from "@components/GlassCard/GlassCard";
import { Icon } from "@components/Icon/Icon";
import { Text } from "@components/Text/Text";
import {
  CardContent,
  CardTitle,
  MainValue,
  ValueContainer,
  Header,
  AccountInfo,
  QuickActionsContainer,
  ActionItem,
  IconContainer,
  ActionLabel,
  SectionTitle,
  DetailCardsContainer,
  DetailCard,
  DetailLabel,
  DetailValue
} from "@screens/Dashboard/style";
import { useTheme } from "styled-components";
import { useTransactions } from "@hooks/useTransactions";
import { formatToBRL } from "@utils/formatter";
import { useUser } from "@hooks/useUser";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSales } from "@hooks/useSales";
import { LineChartComponent } from "@components/LineChart/LineChart";

export function Dashboard() {
  const { currentMonthSales, processSalesForChart, calculatingSales, processAverageTicketForChart } = useSales()
  const { currentMonthTransactions } = useTransactions()
  const [finalValue, setFinalValue] = useState(currentMonthSales.total + currentMonthTransactions.total)
  const { userData } = useUser()
  const { logout } = useAuth()

  const theme = useTheme();

  const navigation = useNavigation();

  const [isHydrated, setIsHydrated] = useState(false);
  const [showCharts, setShowCharts] = useState(true);

  function resolveMainText() {
    if (finalValue === 0)
      return <MainValue theme={theme} style={{ color: theme.colors.text.secondary }}>{formatToBRL(finalValue)}</MainValue>
    else if (finalValue > 0)
      return <MainValue theme={theme} style={{ color: '#2ECC71' }}>{formatToBRL(finalValue)} </MainValue>
    else
      return <MainValue theme={theme} style={{ color: theme.colors.error.text }}>{formatToBRL(finalValue)}</MainValue>
  }

  useEffect(() => {
    setFinalValue(currentMonthSales.total + currentMonthTransactions.total)
  }, [currentMonthSales, currentMonthTransactions])

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  const quickActions = [
    {
      icon: 'coin',
      label: 'Vendas',
      onPress: () => navigation.navigate('Sales', { screen: 'CreateSale' })
    },
    {
      icon: 'inventory',
      label: 'Produtos',
      onPress: () => navigation.navigate('Products', { screen: 'CreateProduct' })
    },
    {
      icon: 'build',
      label: 'Serviços',
      onPress: () => navigation.navigate('Services')
    },
    {
      icon: 'arrowReverse',
      label: 'Transações',
      onPress: () => navigation.navigate('Transactions')
    },
    {
      icon: 'person',
      label: 'Conta',
      onPress: () => navigation.navigate('MyAccount')
    },
  ]

  return (
    <ScrollContainer showsVerticalScrollIndicator={false}>
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

      <View style={{ gap: 12 }}>
        <GlassCard>
          <CardContent>
            <CardTitle theme={theme}>Resumo {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</CardTitle>
            {
              !calculatingSales &&
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
            }
          </CardContent>
        </GlassCard>

        <View style={{marginBottom: 10}}>
          <DetailCardsContainer>
            <DetailCard onPress={() => navigation.navigate('Sales')}>
              <GlassCard style={{ height: 110, justifyContent: 'center' }}>
                <CardContent>
                  <DetailLabel theme={theme} numberOfLines={1}>Total Vendas</DetailLabel>
                  <DetailValue style={{ color: '#2ECC71' }}>{formatToBRL(currentMonthSales.total)}</DetailValue>
                </CardContent>
              </GlassCard>
            </DetailCard>

            <DetailCard onPress={() => navigation.navigate('Transactions')}>
              <GlassCard style={{ height: 110, justifyContent: 'center' }}>
                <CardContent>
                  <DetailLabel theme={theme} numberOfLines={1}>Saldo Transações</DetailLabel>
                  <DetailValue style={{ color: currentMonthTransactions.total >= 0 ? '#2ECC71' : theme.colors.error.text }}>
                    {formatToBRL(currentMonthTransactions.total)}
                  </DetailValue>
                </CardContent>
              </GlassCard>
            </DetailCard>
          </DetailCardsContainer>
        </View>

        <View>
          <QuickActionsContainer horizontal showsHorizontalScrollIndicator={false}>
            {quickActions.map((action, index) => (
              <ActionItem key={index} onPress={action.onPress}>
                <IconContainer theme={theme}>
                  <Icon name={action.icon} size={16} color={theme.colors.text.primary} />
                </IconContainer>
                <ActionLabel theme={theme}>{action.label}</ActionLabel>
              </ActionItem>
            ))}
          </QuickActionsContainer>
        </View>

        <View style={{ marginBottom: 30, marginTop: 10 }}>
          {showCharts && (
            <View style={{ gap: 20, alignItems: 'center' }}>
              <LineChartComponent
                title={`Comparativo de vendas ${new Date().toLocaleDateString('pt-BR', { year: 'numeric' })}`}
                chartData={processSalesForChart()}
                chartLegend={'Total por mês (R$)'}
                showHorizontalLines
              />
              <LineChartComponent
                title={`Comparativo de valor média por venda ${new Date().toLocaleDateString('pt-BR', { year: 'numeric' })}`}
                chartData={processAverageTicketForChart()}
                chartLegend={'Média por mês (R$)'}
                strokeColor={theme.colors.primary}
                showHorizontalLines
              />
            </View>
          )}
        </View>
      </View>
    </ScrollContainer>
  )
}