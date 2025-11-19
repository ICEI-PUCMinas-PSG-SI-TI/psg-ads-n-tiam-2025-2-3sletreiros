import { StackNavigator } from "../../../components/StackNavigator/StackNavigator";

import { EditProfile } from "../../../screens/EditProfile/EditProfile";
import { MyAccount } from "../../../screens/MyAccount/MyAccount";


export function MyAccountStack() {
    const screens = [
        {
            component: MyAccount,
            name: 'MyAccountStack'
        },
        {
            component: EditProfile,
            name: 'EditProfile'
        }
    ]
    return (
        <StackNavigator screens={screens}/>
    )
}