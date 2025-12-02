import { CustomAnimation } from "@components/CustomAnimation/CustomAnimation";
import { Text } from "@components/Text/Text";
import { View } from "react-native";
import { Container } from "src/styles/global";

export function CreateSale() {
    
    return (
        <Container>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'center'}}>
                <Text variant="subtitle" align={'center'}>Lance uma nova venda</Text>
                <CustomAnimation name={'money'} size={40}/>
            </View>
        </Container>
    )
}