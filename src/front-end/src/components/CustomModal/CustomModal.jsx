import { Modal } from "react-native";
import { Overlay, CenterContainer, ModalContent } from "./style";

export function CustomModal({ visible, onClose, children, transparent = true }) {
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
            {children}
          </ModalContent>
        </CenterContainer>
      </Overlay>
    </Modal>
  );
}
