import React, { createContext, useEffect, useState } from "react";
import { 
  collection, 
  query as dbQuery, 
  addDoc, 
  getDoc, 
  orderBy, 
  onSnapshot 
} from "firebase/firestore";
import { db } from "@config/firebase";
import { useFlashMessage } from "@hooks/useFlashMessage";
import { useAuth } from "@hooks/useAuth";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const { user } = useAuth();
  const { showFlashMessage } = useFlashMessage();

  async function createProduct(product) {
    try {
      if (!product.name || !product.price || !product.quantity) throw new Error('Insira todos os campos obrigatórios: nome, preço e quantidade.');

      const ref = collection(db, 'company', user.uid, 'products');

      const createdProductRef = await addDoc(ref, {
        ...product,
        price: Number(product.price),
        quantity: Number(product.quantity),
      });

      const snapshot = await getDoc(createdProductRef);

      showFlashMessage('Produto registrado com sucesso!', 'success');

      return {
        id: snapshot.id,
        ...snapshot.data()
      };
    } catch (error) {
      showFlashMessage(`Erro ao criar produto: ${error.message}`, 'error');
      throw new Error(error.message);
    }
  }

  async function fetchProducts() {
    console.log("Using onSnapshot for real-time products data.");
  }

  useEffect(() => {
    if (!user || !user.uid) return;

    setLoadingProducts(true);

    const ref = dbQuery(
      collection(db, "company", user.uid, "products"),
      orderBy("name", "asc")
    );

    const unsubscribe = onSnapshot(ref, snapshot => {
      const productsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
      setLoadingProducts(false);
    }, (error) => {
        setLoadingProducts(false);
        showFlashMessage('Erro ao assinar atualizações de produtos.', 'error');
    });

    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <ProductsContext.Provider 
      value={{
        products,
        loadingProducts,
        createProduct,
        fetchProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}