import { CustomAnimation } from "@components/CustomAnimation/CustomAnimation";
import { Text } from "@components/Text/Text";
import { View } from "react-native";
import { Container } from "src/styles/global";

export function CreateSale() {
    
    return (
        <Container>
            <View style={{alignItems: 'center', gap: 10, justifyContent: 'center'}}>
                <CustomAnimation name={'sale'} size={120}/>
                <Text>Lance novas vendas</Text>
            </View>
        </Container>
    )
}