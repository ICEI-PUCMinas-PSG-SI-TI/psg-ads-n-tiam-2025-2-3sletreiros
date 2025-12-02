import { useContext } from "react";
import { SalesContext } from "src/contexts/SalesContext";

export function useSales() {
    return useContext(SalesContext)
}