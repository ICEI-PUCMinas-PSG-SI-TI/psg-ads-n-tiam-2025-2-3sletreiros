import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "../screens/Home/Home"
import { SignIn } from "../screens/SignIn/SignIn"
import { Login } from "../screens/Login/Login"

const Stack = createNativeStackNavigator()

export function PublicRoutes(){

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Cadastro" component={SignIn} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
}