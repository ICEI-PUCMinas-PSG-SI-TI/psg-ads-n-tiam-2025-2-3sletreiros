import styled from "styled-components/native";

export const ServiceCard = styled.View`
    background-color: ${({ theme }) => theme.colors.background.surface};
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ServiceInfo = styled.View`
    flex: 1;
`;

export const ServicePrice = styled.View`
    margin-left: 16px;
`;
