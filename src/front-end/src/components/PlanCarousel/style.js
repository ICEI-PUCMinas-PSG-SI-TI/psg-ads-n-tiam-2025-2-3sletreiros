import styled from "styled-components";
import { Text } from "../Text/Text";

export const PlanTitle = styled(Text)`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 32px;
`;

export const ButtonContainer = styled.View`
    flex-direction: row;
    position: absolute;
    bottom: 15px;
    width: 100%;
    justify-content: center;
    align-self: center;
`

export const PlanDescription = styled(Text)`
    font-size: 14px;
    margin-bottom: 32px;
`;
