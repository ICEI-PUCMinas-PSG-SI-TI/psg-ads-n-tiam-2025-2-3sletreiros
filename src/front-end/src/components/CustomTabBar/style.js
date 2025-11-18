import styled from "styled-components";


export const Container = styled.View`
    flex-direction: row;
    justify-content: center;
    gap: 24px;
    background-color: ${({ color }) => color};
    width: 80%;
    align-self: center;
    padding: 8px;
    border-radius: 32px;
`