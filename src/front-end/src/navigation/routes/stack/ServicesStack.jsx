import { StackNavigator } from "@components/StackNavigator/StackNavigator";
import { Services } from "@screens/Services/Services";
import { CreateService } from "@screens/CreateService/CreateService";

export function ServicesStack() {
    const screens = [
        {
            name: 'Services',
            component: Services
        },
        {
            name: 'CreateService',
            component: CreateService
        }
    ]
    return (
        <StackNavigator screens={screens}/>
    )
}
