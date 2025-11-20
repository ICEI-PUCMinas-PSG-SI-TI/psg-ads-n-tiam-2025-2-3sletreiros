import {StackNavigator} from "../../../components/StackNavigator/StackNavigator"
import { Services } from "../../../screens/Services/Services";

export function ServicesStack() {
    const screens = [
        {
            name: 'ServicesScreen',
            component: Services
        }
    ]
    return (
        <StackNavigator screens={screens}/>
    )
}
