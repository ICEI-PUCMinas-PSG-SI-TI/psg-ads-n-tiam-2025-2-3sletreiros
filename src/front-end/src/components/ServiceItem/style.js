import styled from "styled-components/native";

export const ServiceItemContainer = styled.View`
    padding: 16px;
    background-color: ${({ backgroundColor }) => backgroundColor};
    border-radius: 8px;
`;

export const DeleteButton = styled.TouchableOpacity`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 80px;
    background-color: #e74c3c;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
`;
