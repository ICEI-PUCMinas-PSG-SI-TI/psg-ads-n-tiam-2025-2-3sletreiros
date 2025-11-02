import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Dashboard } from "../screens/Dashboard/Dashboard"

const Stack = createNativeStackNavigator()

export function LoggedRoutes(){

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
    )
}