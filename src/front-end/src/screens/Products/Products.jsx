import { InputField } from "../../components/Input/InputField";
import {  ContentBlock } from "../../styles/global";
import { Button } from "../../components/Button/Button";
import { ContentHeader } from "../FinancialTransactions/style";
import { ProductItem } from "../../components/ProductItem/ProductItem";
import { ScrollContainer } from "../../styles/global";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, onSnapshot, query as dbQuery, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

export function Products(){
    const [products, setProducts] = useState([])

    const {user} = useAuth()
    
    const item = {name: 'Produto', stock: 5, price: 3500}
    const navigation = useNavigation()

    async function fetchProducts() {
        try {
            const productsRef = collection(db, "company", user?.uid, "products")
            const snapshot = await getDocs(productsRef)
            const docs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            setProducts(docs)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        if (!user || !user.uid) return;

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
        });

        return () => unsubscribe();
    }, [user?.uid]);
    
    return(
        
        <ScrollContainer
            showsVerticalScrollIndicator={false}
        >
            <ContentBlock>
                <ContentHeader>
                    <Button 
                        buttonStyle={'primary'} 
                        icon={'addCircle'}
                        onPress={() => navigation.navigate('CreateProduct')}
                        />
                    </ContentHeader>
                </ContentBlock>
            <InputField
                label="Nome do produto"
                placeholder='Ex.: bola'
            /> 
            <ContentBlock>
                <FlatList
                    data={products}
                    renderItem={({item}) => <ProductItem item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ 
                        justifyContent: 'space-between',
                        marginBottom: 16 
                    }}
                />
            </ContentBlock>
            
        </ScrollContainer>
            
    )
    
}