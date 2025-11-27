import { Modal, TouchableOpacity } from "react-native";
import { Overlay, CenterContainer, ModalContent, HeaderContainer, ButtonsContainer } from "./style";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import { useTheme } from "styled-components";

export function BottomPickerModal({ visible, onClose, transparent = true, onPickGallery, onPickCamera }) {
    const theme = useTheme()

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
            <HeaderContainer>
                <TouchableOpacity onPress={onClose}>
                    <Icon color={theme.colors.error.background} name={'close'}/>
                </TouchableOpacity>
            </HeaderContainer>
            <ButtonsContainer>
                <Button 
                    icon={'gallery'} 
                    buttonStyle={'primary'} 
                    fullWidth
                    onPress={onPickGallery}
                >
                    Galeria
                </Button>
                <Button 
                    icon={'camera'} 
                    buttonStyle={'primary'} 
                    fullWidth
                    onPress={onPickCamera}
                >
                    Câmera
                </Button>
            </ButtonsContainer>
            </ModalContent>
        </CenterContainer>
        </Overlay>
    </Modal>
    );
}
