import {StackNavigator} from "../../../components/StackNavigator/StackNavigator"
import { Dashboard } from "../../../screens/Dashboard/Dashboard";

export function DashBoardStack() {
    const screens = [
        {
            name: 'DashboardScreen',
            component: Dashboard
        }
    ]
    return (
        <StackNavigator screens={screens}/>
    )
}