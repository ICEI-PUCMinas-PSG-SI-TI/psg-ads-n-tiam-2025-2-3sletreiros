import { StackNavigator } from "@components/StackNavigator/StackNavigator";

import { CreateProduct } from "@screens/CreateProduct/CreateProduct";
import { Products } from "@screens/Products/Products";

export function ProductsStack() {
    const screens = [
        {
            name: 'Products',
            component: Products
        },
        {
            component: CreateProduct,
            name: 'CreateProduct'
        }
    ]
    return (
        <StackNavigator screens={screens}/>
    )
}