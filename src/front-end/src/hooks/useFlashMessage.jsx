import { useContext } from "react";
import { FlashMessageContext } from "@contexts/FlashMessageContext";

export function useFlashMessage(){ 
    return useContext(FlashMessageContext)
}