import { StackNavigator } from "@components/StackNavigator/StackNavigator";

import { CreateProduct } from "@screens/CreateProduct/CreateProduct";
import { Products } from "@screens/Products/Products";
import { ProductDetails } from "@screens/ProductDetails/ProductDetails";
import { EditProduct } from "@screens/EditProduct/EditProduct";


export function ProductsStack() {
    const screens = [
        {
            name: 'Products',
            component: Products
        },
        {
            component: CreateProduct,
            name: 'CreateProduct'
        },
        {
            component: EditProduct,
            name: 'EditProduct'
        },
        {
            component: ProductDetails,
            name: 'ProductDetails'
        }
    ]
    return (
        <StackNavigator screens={screens}/>
    )
}