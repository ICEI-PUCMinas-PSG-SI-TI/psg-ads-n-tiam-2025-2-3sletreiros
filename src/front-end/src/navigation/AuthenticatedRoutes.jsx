import {TabsNavigator} from "../components/TabsNavigator/TabsNavigator"

import { DashBoardStack } from "./routes/stack/DashBoardStack"
import { TransactionsStack } from "./routes/stack/TransactionsStack"
import { MyAccountStack } from "./routes/stack/MyAccountStack"
import { ProductsStack } from "./routes/stack/ProductsStack"
import { AIReport } from "../screens/AIReport/AIReport"

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
            name: 'AIReport',
            component: AIReport,
            icon: 'artificialIntelligence'
        },
        {
            name: 'MyAccount',
            component: MyAccountStack,
            icon: 'person'
        },
    ]

    return (
        <TabsNavigator tabs={tabs} />
    )
}