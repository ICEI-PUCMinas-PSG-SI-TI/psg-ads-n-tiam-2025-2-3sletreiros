import { Text } from "../Text/Text";
import { Card } from "./style";
import { Image } from "react-native";
import {formatToBRL} from "../../utils/formatter"

export function ProductItem({item}){

    return(
        <Card>
            <Image source={{uri: item.image}} style={{ width: 150, height: 150, borderRadius: 8 }}/>
            <Text variant="subtitle" style={{ marginTop: 10}}>{item.name}</Text>
            <Text>Estoque: {item.stock}</Text>
            <Text>Preço: {formatToBRL(item.price)}</Text>
        </Card>

    )
}