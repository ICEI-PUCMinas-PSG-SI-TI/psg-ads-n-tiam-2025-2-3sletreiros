import { InputField } from "../../components/Input/InputField";
import {  ContentBlock } from "../../styles/global";
import { Button } from "../../components/Button/Button";
import { ContentHeader } from "../FinancialTransactions/style";
import { ProductItem } from "../../components/ProductItem/ProductItem";
import { ScrollContainer, Container } from "../../styles/global";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, onSnapshot, query as dbQuery, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { EmptyList } from "../../components/EmptyList/EmptyList";

export function Products(){
    const [products, setProducts] = useState([])

    const {user} = useAuth()

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
        
        <Container
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
                placeholder='Bola'
            /> 
            <FlatList
                data={products}
                renderItem={({item}) => <ProductItem item={item} />}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={{
                    marginBottom: 16,
                    justifyContent: 'space-between'
                }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<EmptyList message={'Nenhum produto encontrado.'}/>}
            />
        </Container>       
    )
}