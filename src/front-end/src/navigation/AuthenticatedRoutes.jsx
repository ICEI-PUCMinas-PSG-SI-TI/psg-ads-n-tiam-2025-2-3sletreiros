import { DashBoardStack } from "./routes/stack/DashBoardStack"
import { TransactionsStack } from "./routes/stack/TransactionsStack"
import {TabsNavigator} from "../components/TabsNavigator/TabsNavigator"
import {MyAccount} from "../screens/MyAccount/MyAccount"

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
            icon: 'compare-arrows'
        },
        {
            name: 'MyAccount',
            component: MyAccount,
            icon: 'person'
        }
    ]

    return (
        <TabsNavigator tabs={tabs} />
    )
}