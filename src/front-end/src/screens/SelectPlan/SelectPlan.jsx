import { Container } from "../../styles/global";
import {Text} from "../../components/Text/Text"
import { useCallback, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useFocusEffect } from "@react-navigation/native";

export function SelectPlan() {
    const [plans, setPlans] = useState([])

    async function getPlans() {
        const snapshot = await getDocs(collection(db, "plan"))
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        setPlans(data)
    }

    useFocusEffect(useCallback(() => {
        getPlans()
    }))

    return (
        <Container>
            {
                plans.map((plan) => {
                    return <Text key={plan.id}>{plan.name}</Text>
                })
            }
        </Container>
    )
}