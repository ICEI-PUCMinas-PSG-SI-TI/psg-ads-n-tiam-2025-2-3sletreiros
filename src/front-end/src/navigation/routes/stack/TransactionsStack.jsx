import {StackNavigator} from "@components/StackNavigator/StackNavigator"

import {FinancialTransactions} from "@screens/FinancialTransactions/FinancialTransactions"
import { TransactionDetails } from "@screens/TransactionDetails/TransactionDetails"

export function TransactionsStack() {
    const screens = [
        {
            name: 'FinancialTransactions',
            component: FinancialTransactions
        },
        {
            name: 'TransactionDetails',
            component: TransactionDetails
        }
    ]
    return (
        <StackNavigator screens={screens}/>
    )
}