import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Dashboard } from "../screens/Dashboard/Dashboard"
import { FinancialTransactions } from "../screens/FinancialTransactions/FinancialTransactions"

const Stack = createNativeStackNavigator()

export function LoggedRoutes(){

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Financial_Transactions" component={FinancialTransactions} />
        </Stack.Navigator>
    )
}