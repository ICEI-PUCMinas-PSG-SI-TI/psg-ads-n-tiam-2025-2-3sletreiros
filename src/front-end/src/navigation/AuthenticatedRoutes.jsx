import {TabsNavigator} from "@components/TabsNavigator/TabsNavigator"

import { DashBoardStack } from "./routes/stack/DashBoardStack"
import { TransactionsStack } from "./routes/stack/TransactionsStack"
import { MyAccountStack } from "./routes/stack/MyAccountStack"
import { ProductsStack } from "./routes/stack/ProductsStack"


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
            name: 'MyAccount',
            component: MyAccountStack,
            icon: 'person'
        }
    ]

    return (
        <TabsNavigator tabs={tabs} />
    )
}