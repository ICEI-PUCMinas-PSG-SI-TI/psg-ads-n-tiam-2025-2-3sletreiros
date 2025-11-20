import {StackNavigator} from "../../../components/StackNavigator/StackNavigator"
import { Sales } from "../../../screens/Sales/Sales";

export function SalesStack() {
    const screens = [
        {
            name: 'SalesScreen',
            component: Sales
        }
    ]
    return (
        <StackNavigator screens={screens}/>
    )
}
