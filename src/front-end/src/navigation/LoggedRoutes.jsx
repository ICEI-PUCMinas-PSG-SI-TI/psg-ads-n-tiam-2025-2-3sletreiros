import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Dashboard } from "../screens/Dashboard/Dashboard"
import { FinancialTransactions } from "../screens/FinancialTransactions/FinancialTransactions"
import { TransactionDetails } from "../screens/TransactionDetails/TransactionDetails"

const Stack = createNativeStackNavigator()

export function LoggedRoutes(){

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="FinancialTransactions" component={FinancialTransactions} />
            <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
        </Stack.Navigator>
    )
}