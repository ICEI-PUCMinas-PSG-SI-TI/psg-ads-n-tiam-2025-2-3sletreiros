import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './src/theme/theme';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './src/routes/AppRoutes';

export default function App() {
  const deviceTheme = useColorScheme()
  const theme = deviceTheme === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style={deviceTheme === 'dark' ? 'light' : 'dark'} backgroundColor={theme.colors.background.default} />
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}