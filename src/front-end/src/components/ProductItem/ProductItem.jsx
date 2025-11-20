import { Text } from "../Text/Text";
import { Card } from "./style";
import { Image } from "react-native";
import ImgTeste from '../../../assets/productsImage/150x150.png'

export function ProductItem({item}){

    return(
        <Card>
            <Image source={ImgTeste} style={{ width: 150, height: 150, borderRadius: 8 }}/>
            <Text variant="subtitle" style={{ marginTop: 10}}>{item.name}</Text>
            <Text>Estoque: {item.stock}</Text>
            <Text>Preço: R${item.price}</Text>
        </Card>

    )
}