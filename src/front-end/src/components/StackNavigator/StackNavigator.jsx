import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useTheme } from 'styled-components';

const Stack = createNativeStackNavigator();

export function StackNavigator({screens}){
    const theme = useTheme()

    return (
        <Stack.Navigator 
            screenOptions={{
                contentStyle: {
                    backgroundColor: theme.colors.background.default
                },
                animation: 'slide_from_right',
                animationDuration: 250,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                headerShown: false,
                presentation: 'card',
                animationTypeForReplace: 'push',
                fullScreenGestureEnabled: true
            }}
        >
            {screens.map((screen, index) => (
                <Stack.Screen
                    key={index}
                    name={screen?.name}
                    component={screen?.component}
                    options={{
                        ...screen?.options,
                        contentStyle: {
                            backgroundColor: theme.colors.background.default
                        }
                    }}
                />
            ))}
        </Stack.Navigator>
    );
};