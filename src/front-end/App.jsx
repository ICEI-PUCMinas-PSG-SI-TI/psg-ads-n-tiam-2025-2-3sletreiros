import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './src/theme/theme';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './src/navigation/AppRoutes';
import { Container } from './src/styles/global';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  const deviceTheme = useColorScheme()
  const theme = deviceTheme === 'dark' ? darkTheme : lightTheme

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Container>
          <NavigationContainer>
            <StatusBar style={deviceTheme === 'dark' ? 'light' : 'dark'} backgroundColor={theme.colors.background.default} />
            <AppRoutes />
          </NavigationContainer>
        </Container>
      </ThemeProvider>
    </AuthProvider>
  );
}