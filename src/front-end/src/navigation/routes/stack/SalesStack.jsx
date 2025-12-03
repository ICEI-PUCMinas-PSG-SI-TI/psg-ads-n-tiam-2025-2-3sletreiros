import { StackNavigator } from "@components/StackNavigator/StackNavigator";
import { CreateSale } from "@screens/CreateSale/CreateSale";

import { Sales } from "@screens/Sales/Sales";

export function SalesStack() {
    const screens = [
        {
            name: 'Sales',
            component: Sales
        },
        {
            name: 'CreateSale',
            component: CreateSale
        }
    ]
    return (
        <StackNavigator screens={screens}/>
    )
}