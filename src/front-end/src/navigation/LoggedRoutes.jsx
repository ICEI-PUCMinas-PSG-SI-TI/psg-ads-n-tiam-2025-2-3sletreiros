import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Dashboard } from "../screens/Dashboard/Dashboard"
import { Financial_Transactions } from "../screens/Financial_Transactions/Financial_Transactions"

const Stack = createNativeStackNavigator()

export function LoggedRoutes(){

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Financial_Transactions" component={Financial_Transactions} />
        </Stack.Navigator>
    )
}