import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator()

export function NotLoggedRoutes(){

    return (
        <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Cadastro" component={SignIn} />
            <Stack.Screen name="Login" component={Login} />
          </>
    )
}