import { useContext } from "react";
import { ProductsContext } from "src/contexts/ProductsContext";

export function useProducts() {
    return useContext(ProductsContext)
}