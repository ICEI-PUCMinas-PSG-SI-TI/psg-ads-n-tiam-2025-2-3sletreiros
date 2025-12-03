import { StackNavigator } from "@components/StackNavigator/StackNavigator";

import { EditProfile } from "@screens/EditProfile/EditProfile";
import { MyAccount } from "@screens/MyAccount/MyAccount";
import { SelectPlan } from "@screens/SelectPlan/SelectPlan";


export function MyAccountStack() {
    const screens = [
        {
            component: MyAccount,
            name: 'MyAccountStack'
        },
        {
            component: EditProfile,
            name: 'EditProfile'
        },
        {
            component: SelectPlan,
            name: 'SelectPlan'
        }
    ]
    return (
        <StackNavigator screens={screens}/>
    )
}