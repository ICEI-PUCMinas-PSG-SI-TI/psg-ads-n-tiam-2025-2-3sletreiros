import { Text } from "@components/Text/Text";
import { Card } from "@components/ProductItem/style";
import { Image, View } from "react-native";
import {formatToBRL} from "@utils/formatter"
import { useNavigation } from "@react-navigation/native";

export function ProductItem({item}){
    const navigation = useNavigation()

    function openDetails() {
        navigation.navigate('ProductDetails', {productId: item.id})
    }

    return(
            <Card onPress={openDetails}>
                <View style={{ width: '100%', height: 150, borderRadius: 8, overflow: 'hidden'}}> 
                    <Image source={{uri: item.image}} style={{ width: '100%', height: 150, borderRadius: 8, resizeMode: 'cover' }}/>
                </View>
                <Text variant="subtitle" style={{ marginTop: 10}}>{item.name}</Text>
                <Text color={'#b6b6b6ff'} numLines={1} style={{fontSize: 12}}>{(item.description)}</Text>
                <Text color={'#b6b6b6ff'} style={{fontSize: 10}}>{formatToBRL(item.price)}</Text>
                <Text color={'#b6b6b6ff'} style={{fontSize: 10}}>Estoque: {item.stock}</Text>
            </Card>

    )
}