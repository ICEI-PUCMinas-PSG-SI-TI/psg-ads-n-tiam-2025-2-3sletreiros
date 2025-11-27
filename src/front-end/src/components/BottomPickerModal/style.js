import styled from "styled-components/native";

export const Overlay = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const CenterContainer = styled.Pressable`
  width: 90%;
`;

export const ModalContent = styled.View`
  border-radius: 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background.default};
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-offset: 0px 2px;
  shadow-radius: 4px;
  elevation: 4;
`;

export const HeaderContainer = styled.View`
  width: 100%;
  align-items: flex-end;
  margin-bottom: 20px;
`

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`

export const OptionContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`