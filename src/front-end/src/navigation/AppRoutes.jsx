import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home/Home';
import { SignIn } from '../screens/SignIn/SignIn';
import { useAuth } from '../hooks/useAuth';
import { Dashboard } from '../screens/Dashboard/Dashboard';
import { ActivityIndicator, View } from 'react-native';
import { Login } from '../screens/Login/Login';
import { useTheme } from 'styled-components';

const Stack = createNativeStackNavigator()

export default function AppRoutes() {
  const {user, loading} = useAuth()
  const theme = useTheme()

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.colors.primary}/>
        </View>
      );
    }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={user ? 'Dashboard' : 'Home'}>
       {user ? (
          <Stack.Screen name="Dashboard" component={Dashboard} />
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Cadastro" component={SignIn} />
            <Stack.Screen name="Login" component={Login} />
          </>
        )}
    </Stack.Navigator>
  );
}
