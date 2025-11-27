import { Text } from "../Text/Text";
import { Card } from "./style";
import { Image } from "react-native";
import {formatToBRL} from "../../utils/formatter"

export function ProductItem({item}){
    return(
        <Card>
            <Image source={{uri: item.image}} style={{ width: '100%', height: 150, borderRadius: 8 }}/>
            <Text variant="subtitle" style={{ marginTop: 10}}>{item.name}</Text>
            <Text color={'#b6b6b6ff'}>{formatToBRL(item.price)}</Text>
            <Text color={'#b6b6b6ff'}>Estoque: {item.stock}</Text>
        </Card>

    )
}