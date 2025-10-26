import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home/Home';
import { SignIn } from '../screens/SignIn/SignIn';

const Stack = createNativeStackNavigator()

export default function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Cadastro" component={SignIn} />
    </Stack.Navigator>
  );
}
