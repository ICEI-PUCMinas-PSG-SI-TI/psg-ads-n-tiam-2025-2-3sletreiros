import {TabsNavigator} from "@components/TabsNavigator/TabsNavigator"

import { DashBoardStack } from "@navigation/routes/stack/DashBoardStack"
import { TransactionsStack } from "@navigation/routes/stack/TransactionsStack"
import { MyAccountStack } from "@navigation/routes/stack/MyAccountStack"
import { ProductsStack } from "@navigation/routes/stack/ProductsStack"
import { ServicesStack } from "@navigation/routes/stack/ServicesStack"
import { SalesStack } from "./routes/stack/SalesStack"


export function AuthenticatedRoutes(){

    const tabs = [
        {
            name: 'Dashboard',
            component: DashBoardStack,
            icon: 'home'
        },
        {
            name: 'Transactions',
            component: TransactionsStack,
            icon: 'arrowReverse'
        },
        {
            name: 'Products',
            component: ProductsStack,
            icon: 'inventory'
        },
        {
            name: 'Services',
            component: ServicesStack,
            icon: 'build'
        },
        {
            name: 'Sales',
            component: SalesStack,
            icon: 'coin'
        },
        {
            name: 'MyAccount',
            component: MyAccountStack,
            icon: 'person'
        }
    ]

    return (
        <TabsNavigator tabs={tabs} />
    )
}