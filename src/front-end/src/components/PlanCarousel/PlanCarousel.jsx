import Carousel from 'react-native-reanimated-carousel';
import { ConfirmationModal } from "@components/ConfirmationModal/ConfirmationModal";
import { Dimensions, View } from 'react-native';
import { PlanCard } from "@components/PlanCarousel/PlanCard";
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from "@config/firebase";
import { useNavigation } from '@react-navigation/native';
import { useFlashMessage } from "@hooks/useFlashMessage";

const { width } = Dimensions.get('window');

export function PlansCarousel({plans}) {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState(null)

    function onCloseModal() {
      setIsOpenModal(false)
    }

    function onOpenModal(plan) {
      setSelectedPlan(plan)
      setIsOpenModal(true)
    }

    const {showFlashMessage} = useFlashMessage()
    
    const navigation = useNavigation()

    async function subscribeToPlan() {
      try {
          const auth = getAuth()
          const uid = auth?.currentUser?.uid

          if (!uid || !selectedPlan) return

          const planRef = doc(db, "plan", selectedPlan.id)
          const companyRef = doc(db, "company", uid)

          await updateDoc(companyRef, {
              plan: planRef
          })

          showFlashMessage('Plano assinado com sucesso!', 'success')
          navigation.goBack()
      } catch (error) {
          showFlashMessage('Erro ao assinar plano.', 'error')
      }
    }

  return (
    <View>
      <ConfirmationModal 
        visible={isOpenModal} 
        onClose={onCloseModal} 
        title={'Confirma adesão ao plano?'}
        description={`Ao confirmar, você fará parte do plano ${selectedPlan?.name}`}
        onConfirmation={subscribeToPlan}
      />
      <Carousel
        width={width}
        data={plans}
        renderItem={({ item }) => (
          <PlanCard plan={item} openModal={() => onOpenModal(item)}/>
        )}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 90,
          parallaxAdjacentItemScale: 0.85
        }}
      />
    </View>
  );
}