import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './src/theme/theme';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppRoutes from './src/navigation/AppRoutes';
import { Container } from './src/styles/global';
import { AuthProvider } from './src/contexts/AuthContext';
import { FlashMessageProvider } from './src/contexts/FlashMessageContext';
import { TransactionsProvider } from './src/contexts/TransactionsContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SalesProvider } from './src/contexts/SalesContext';

export default function App() {
  const deviceTheme = useColorScheme()
  const theme = deviceTheme === 'dark' ? darkTheme : lightTheme

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background.default,
      card: theme.colors.background.default,
    },
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <FlashMessageProvider>
        <AuthProvider>
          <SalesProvider>
            <TransactionsProvider>
              <ThemeProvider theme={theme}>
                <Container>
                  <NavigationContainer theme={navigationTheme}>
                    <StatusBar style={deviceTheme === 'dark' ? 'light' : 'dark'} backgroundColor={theme.colors.background.default} />
                    <AppRoutes />
                  </NavigationContainer>
                </Container>
              </ThemeProvider>
            </TransactionsProvider>
          </SalesProvider>
        </AuthProvider>
      </FlashMessageProvider>
    </GestureHandlerRootView>
  );
}