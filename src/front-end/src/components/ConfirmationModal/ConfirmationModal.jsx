import { Modal, View } from "react-native"
import { Text } from "@components/Text/Text"
import { Button } from "@components/Button/Button"
import { Overlay, CenterContainer, ModalContent } from "@components/ConfirmationModal/style";

export function ConfirmationModal({ visible, onClose, transparent = true, onConfirmation, onCancel = onClose, title, description }) {
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={transparent}
            onRequestClose={onClose}
        >
            <Overlay onPress={onClose}>
                <CenterContainer>
                    <ModalContent>
                        <View style={{gap: 10}}>
                            <Text variant="subtitle" style={{textAlign: 'center'}}>{title}</Text>
                            <Text style={{textAlign: 'center'}}>{description}</Text>
                            <View style={{flexDirection: 'row', gap: 15}}>
                                <Button buttonStyle={'error'} onPress={onCancel} fullWidth >Cancelar</Button>
                                <Button buttonStyle={'success'} onPress={onConfirmation} fullWidth >Confirmar</Button>
                            </View>
                        </View>
                    </ModalContent>
                </CenterContainer>
            </Overlay>
            
        </Modal>
    )
}