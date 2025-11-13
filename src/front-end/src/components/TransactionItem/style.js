import styled from "styled-components";
import { Text } from "../Text/Text";
import { Pressable } from "react-native";

export const SecundaryText = styled(Text)`
    color: ${({color}) => color};
`

export const DeleteItemButton = styled(Pressable)`
    position: absolute;
    top: 10px;
    right: 0px;
    background-color: ${({theme}) => theme.colors.error.background};;
    padding: 4px;
    flex-direction: row;
    gap: 4px;
    align-items: center;
    border-radius: 8px;
`