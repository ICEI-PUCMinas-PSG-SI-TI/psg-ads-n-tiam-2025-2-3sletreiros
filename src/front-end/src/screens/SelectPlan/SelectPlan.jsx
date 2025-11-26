import { Container } from "../../styles/global";
import { PlansCarousel } from '../../components/PlanCarousel/PlanCarousel'
import { useCallback, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useFocusEffect } from "@react-navigation/native";
import { Text } from "../../components/Text/Text";

export function SelectPlan() {
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)

    async function getPlans() {
        try {
            setLoading(true)
            const snapshot = await getDocs(collection(db, "plan"))
            
            const planDocs = snapshot.docs
            
            const plansWithFeatures = await Promise.all(
                planDocs.map(async (doc) => {
                    const planData = {
                        id: doc.id,
                        ...doc.data()
                    }
                    
                    const featuresSnapshot = await getDocs(
                        collection(db, "plan", doc.id, "features")
                    )
                    
                    const features = featuresSnapshot.docs.map(featureDoc => ({
                        id: featureDoc.id,
                        ...featureDoc.data()
                    }))
                    
                    return {
                        ...planData,
                        features
                    }
                })
            )
            
            setPlans(plansWithFeatures)
        } catch (error) {
            console.error("Erro ao buscar planos:", error)
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        getPlans()
    }, []))

    return (
        <Container>
            <Text style={{textAlign: 'center'}}>Selecione o plano ideal para impulsionar seus negócios! 🚀</Text>
            <PlansCarousel plans={plans} />
        </Container>
    )
}