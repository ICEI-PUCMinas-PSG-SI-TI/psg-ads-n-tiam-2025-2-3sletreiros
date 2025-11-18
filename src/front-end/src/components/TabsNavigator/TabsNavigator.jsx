import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CustomTabBar } from "../CustomTabBar/CustomTabBar"
import { useTheme } from 'styled-components'

const Tab = createBottomTabNavigator()

export function TabsNavigator({tabs}){
    const theme = useTheme()
    
    return (
        <Tab.Navigator 
            lazy={false}
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                contentStyle: {
                    backgroundColor: theme.colors.background.default
                }
            }}
            tabBar={(props) => <CustomTabBar {...props} tabs={tabs}/>}
        >
            {tabs.map(tab => 
                <Tab.Screen
                    name={tab.name}
                    component={tab.component}
                />
            )}
        </Tab.Navigator>
    )
}