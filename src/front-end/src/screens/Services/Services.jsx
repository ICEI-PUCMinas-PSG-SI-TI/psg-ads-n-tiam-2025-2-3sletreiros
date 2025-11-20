import { Container, ContentBlock } from "../../styles/global";
import { ContentHeader } from "./style";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input/InputField";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useState } from "react";
import { CustomModal } from "../../components/CustomModal/CustomModal";
import { useFlashMessage } from "../../hooks/useFlashMessage";
import { Icon } from "../../components/Icon/Icon";
import { useTheme } from "styled-components";
import { Text } from "../../components/Text/Text";
import { formatToBRL } from "../../utils/formatter";
import { ServiceItem } from "../../components/ServiceItem/ServiceItem";

export function Services() {
    const theme = useTheme();
    const { showFlashMessage } = useFlashMessage();

    const [filter, setFilter] = useState("");
    const [visible, setVisible] = useState(false);
    const [creatingService, setCreatingService] = useState(false);

    const [serviceName, setServiceName] = useState("");
    const [serviceDescription, setServiceDescription] = useState("");
    const [servicePrice, setServicePrice] = useState("");

    // Função para formatar o input de preço
    const handlePriceChange = (text) => {
        // Remove tudo exceto números
        const numbers = text.replace(/\D/g, "");
        
        if (numbers === "") {
            setServicePrice("");
            return;
        }
        
        // Converte para número e divide por 100 para ter os centavos
        const value = parseFloat(numbers) / 100;
        
        // Formata para moeda brasileira
        const formatted = value.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        
        setServicePrice(formatted);
    };

    // Lista temporária de serviços (depois você pode conectar com Firebase)
    const [services, setServices] = useState([]);
    const [loadingServices, setLoadingServices] = useState(false);

    function openModal() {
        setVisible(true);
    }

    function closeModal() {
        setVisible(false);
        setServiceName("");
        setServiceDescription("");
        setServicePrice("");
    }

    function deleteService(serviceId) {
        setServices(services.filter(service => service.id !== serviceId));
        showFlashMessage("Serviço deletado com sucesso!", "success");
    }

    async function addService() {
        try {
            setCreatingService(true);
            
            // Validação básica
            if (!serviceName || !servicePrice) {
                showFlashMessage("Preencha o nome e o preço do serviço", "error");
                return;
            }

            // Converte o preço formatado de volta para número
            const priceNumber = parseFloat(servicePrice.replace(/\./g, "").replace(",", "."));
            
            const newService = {
                id: Date.now().toString(),
                name: serviceName,
                description: serviceDescription,
                price: priceNumber,
            };

            setServices([...services, newService]);
            closeModal();
            showFlashMessage("Serviço adicionado com sucesso!", "success");
        } catch (error) {
            showFlashMessage(error.message, "error");
        } finally {
            setCreatingService(false);
        }
    }

    return (
            <Container>
                <CustomModal visible={visible} onClose={closeModal}>
                    <InputField
                        label="Nome do serviço"
                        value={serviceName}
                        onChangeText={setServiceName}
                        placeholder="Serviço desejado"
                    />

                    <InputField
                        label="Descrição"
                        value={serviceDescription}
                        onChangeText={setServiceDescription}
                        placeholder="Descrição do serviço"
                    />

                    <InputField
                        label="Preço"
                        value={servicePrice}
                        onChangeText={handlePriceChange}
                        keyboardType="numeric"
                        placeholder="0,00"
                    />

                    <Button
                        buttonStyle={"success"}
                        size={"large"}
                        flex
                        onPress={addService}
                        loading={creatingService}
                    >
                        <Icon name={"done"} color={theme.colors.success.text} />
                    </Button>
                </CustomModal>

                <ContentBlock>
                    <ContentHeader>
                        <Button
                            buttonStyle={"primary"}
                            onPress={openModal}
                            icon={"add-circle"}
                        />
                    </ContentHeader>
                </ContentBlock>

                <ContentBlock>
                    <InputField
                        label={"Filtrar serviços"}
                        placeholder="Pesquisar"
                        value={filter}
                        onChangeText={setFilter}
                    />

                    <Button
                        buttonStyle="primary"
                        flex={true}
                        icon={"search"}
                        iconPosition={"left"}
                    >
                        Buscar
                    </Button>
                </ContentBlock>

                <ContentBlock>
                    {loadingServices ? (
                        <ActivityIndicator />
                    ) : (
                        <FlatList
                            data={services.filter((service) =>
                                service.name.toLowerCase().includes(filter.toLowerCase())
                            )}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <ServiceItem
                                    item={{
                                        ...item,
                                        formattedPrice: formatToBRL(item.price)
                                    }}
                                    onDelete={deleteService}
                                />
                            )}
                            ListEmptyComponent={
                                <View style={{ padding: 20, alignItems: "center" }}>
                                    <Text color={theme.colors.text.secondary}>
                                        Nenhum serviço cadastrado
                                    </Text>
                                </View>
                            }
                        />
                    )}
                </ContentBlock>
            </Container>
    );
}
