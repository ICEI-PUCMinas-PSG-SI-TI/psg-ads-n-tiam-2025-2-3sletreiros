import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator()

export function LoggedRoutes(){

    return (
        <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
        </>
    )
}