import { View } from "react-native";
import { GlassCard } from "../GlassCard/GlassCard";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text/Text";
import { ButtonContainer, Card, PlanTitle, PlanDescription, PlanValue } from "./style";
import { useTheme } from "styled-components";
import { Button } from "../Button/Button";
import { formatToBRL } from "../../utils/formatter";

export function PlanCard({ plan }) {
    const theme = useTheme()

    return (
        <GlassCard style={{ width: '80%', minHeight: 350 }}>
            <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                <Icon name={plan?.icon} size={20} color={theme.colors.primary} />
                <PlanTitle color={theme.colors.primary}>{plan?.name}</PlanTitle>
            </View>
            <PlanDescription color={theme.colors.text.primary}>{plan?.description}</PlanDescription>
            <View style={{ marginBottom: 20 }}>
                {plan?.features?.map((feature) => (
                    <View 
                        style={{ 
                            flexDirection: 'row', 
                            gap: 10, 
                            justifyContent: 'flex-start', 
                            alignItems: 'center' 
                        }} 
                        key={feature.id}
                    >
                        <Icon name="done" />
                        <Text>{feature.name}</Text>
                    </View>
                ))}
            </View>
            <PlanValue color={'#2ECC71'}>{formatToBRL(plan?.value)}</PlanValue>
            <ButtonContainer>
                <Button buttonStyle="primary" flex>
                    Selecionar Plano
                </Button>
            </ButtonContainer>
        </GlassCard>
    )
}