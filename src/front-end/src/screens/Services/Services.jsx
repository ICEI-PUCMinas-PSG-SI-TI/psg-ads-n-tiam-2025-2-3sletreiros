import { InputField } from "@components/Input/InputField";
import { ContentBlock } from "../../styles/global";
import { Button } from "@components/Button/Button";
import { ContentHeader } from "@screens/FinancialTransactions/style";
import { ScrollContainer, Container } from "../../styles/global";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, onSnapshot, query as dbQuery, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "@config/firebase";
import { useAuth } from "@hooks/useAuth";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { EmptyList } from "@components/EmptyList/EmptyList";
import { ServiceItem } from "@components/ServiceItem/ServiceItem";
import { useFlashMessage } from "@hooks/useFlashMessage";
import { ConfirmationModal } from "@components/ConfirmationModal/ConfirmationModal";

export function Services() {
    const [services, setServices] = useState([])
    const [searchText, setSearchText] = useState("")
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [serviceToDelete, setServiceToDelete] = useState(null)
    const { user } = useAuth()
    const navigation = useNavigation()
    const { showFlashMessage } = useFlashMessage()

    async function fetchServices() {
        try {
            const servicesRef = collection(db, "company", user?.uid, "services")
            const snapshot = await getDocs(servicesRef)
            const docs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            setServices(docs)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchServices()
    }, [])

    useEffect(() => {
        if (!user || !user.uid) return;

        const ref = dbQuery(
            collection(db, "company", user.uid, "services"),
            orderBy("name", "asc")
        );

        const unsubscribe = onSnapshot(ref, snapshot => {
            const servicesList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setServices(servicesList);
        });

        return () => unsubscribe();
    }, [user?.uid]);

    const filteredServices = services.filter(service =>
        service.name?.toLowerCase().includes(searchText.toLowerCase())
    )

    function handleDeleteRequest(service) {
        setServiceToDelete(service)
        setShowDeleteModal(true)
    }

    async function handleDeleteConfirm() {
        if (!serviceToDelete) return

        try {
            await deleteDoc(doc(db, "company", user?.uid, "services", serviceToDelete.id))
            showFlashMessage('Serviço excluído com sucesso!', 'success')
            setShowDeleteModal(false)
            setServiceToDelete(null)
        } catch (error) {
            console.error(error)
            showFlashMessage('Erro ao excluir serviço', 'error')
        }
    }

    function handleDeleteCancel() {
        setShowDeleteModal(false)
        setServiceToDelete(null)
    }

    return (
        <Container
            showsVerticalScrollIndicator={false}
        >
            <ConfirmationModal
                visible={showDeleteModal}
                onConfirmation={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                onClose={handleDeleteCancel}
                title="Excluir Serviço"
                description={`Deseja realmente excluir o serviço "${serviceToDelete?.name}"?`}
            />

            <ContentBlock>
                <ContentHeader>
                    <Button
                        buttonStyle={'primary'}
                        icon={'addCircle'}
                        onPress={() => navigation.navigate('CreateService')}
                    />
                </ContentHeader>
            </ContentBlock>
            <InputField
                label="Filtrar serviços"
                placeholder='Pesquisar'
                value={searchText}
                onChangeText={setSearchText}
            />
            <FlatList
                data={filteredServices}
                renderItem={({ item }) => (
                    <ServiceItem 
                        item={item} 
                        onDelete={handleDeleteRequest}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<EmptyList message={'Nenhum serviço encontrado.'} />}
            />
        </Container>
    )
}
