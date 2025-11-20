import styled from "styled-components/native";

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 48px;
`

export const AccountInfo = styled.View`
    flex-direction: column;
    gap: 12px;
`

export const Plan = styled.View`
    flex-direction: row;
    alignItems: center;
    width: auto;
    background-color: ${({theme}) =>theme.colors.success.background};
    padding: 8px;
    border-radius: 16px;
    justify-content: center;
    gap: 4px;
`

export const ActionButtonsContainer = styled.View`
    flex-direction: row;
    gap: 16px;
    position: absolute;
    bottom: 30px;
    justify-content: center;
    width: 100%;
`