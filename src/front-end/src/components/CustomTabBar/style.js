import styled from "styled-components";


export const Container = styled.View`
    flex-direction: row;
    justify-content: center;
    gap: 24px;
    background-color: ${({ color }) => color};
    align-self: center;
    padding: 12px;
    border-radius: 32px;
`