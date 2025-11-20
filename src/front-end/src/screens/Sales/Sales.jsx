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

export function Sales() {
    const theme = useTheme();
    const { showFlashMessage } = useFlashMessage();

    const [filter, setFilter] = useState("");
    const [visible, setVisible] = useState(false);
    const [creatingSale, setCreatingSale] = useState(false);

    const [clientName, setClientName] = useState("");
    const [serviceName, setServiceName] = useState("");
    const [saleValue, setSaleValue] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Dinheiro");

    // Lista temporária de vendas
    const [sales, setSales] = useState([]);
    const [loadingSales, setLoadingSales] = useState(false);

    // Função para formatar o input de valor
    const handleValueChange = (text) => {
        const numbers = text.replace(/\D/g, "");
        
        if (numbers === "") {
            setSaleValue("");
            return;
        }
        
        const value = parseFloat(numbers) / 100;
        const formatted = value.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        
        setSaleValue(formatted);
    };

    function openModal() {
        setVisible(true);
    }

    function closeModal() {
        setVisible(false);
        setClientName("");
        setServiceName("");
        setSaleValue("");
        setPaymentMethod("Dinheiro");
    }

    async function addSale() {
        try {
            setCreatingSale(true);
            
            if (!clientName || !serviceName || !saleValue) {
                showFlashMessage("Preencha todos os campos obrigatórios", "error");
                return;
            }

            const valueNumber = parseFloat(saleValue.replace(/\./g, "").replace(",", "."));
            
            const newSale = {
                id: Date.now().toString(),
                clientName,
                serviceName,
                value: valueNumber,
                paymentMethod,
                date: new Date().toISOString(),
            };

            setSales([newSale, ...sales]);
            closeModal();
            showFlashMessage("Venda registrada com sucesso!", "success");
        } catch (error) {
            showFlashMessage(error.message, "error");
        } finally {
            setCreatingSale(false);
        }
    }

    function deleteSale(saleId) {
        setSales(sales.filter(sale => sale.id !== saleId));
        showFlashMessage("Venda deletada com sucesso!", "success");
    }

    return (
        <Container>
            <CustomModal visible={visible} onClose={closeModal}>
                <InputField
                    label="Nome do cliente"
                    value={clientName}
                    onChangeText={setClientName}
                    placeholder="Digite o nome do cliente"
                />

                <InputField
                    label="Serviço"
                    value={serviceName}
                    onChangeText={setServiceName}
                    placeholder="Qual serviço foi realizado?"
                />

                <InputField
                    label="Valor"
                    value={saleValue}
                    onChangeText={handleValueChange}
                    keyboardType="numeric"
                    placeholder="0,00"
                />

                <InputField
                    label="Forma de pagamento"
                    value={paymentMethod}
                    onChangeText={setPaymentMethod}
                    placeholder="Ex: Dinheiro, Cartão, PIX"
                />

                <Button
                    buttonStyle={"success"}
                    size={"large"}
                    flex
                    onPress={addSale}
                    loading={creatingSale}
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
                    label={"Filtrar vendas"}
                    placeholder="Pesquisar por cliente ou serviço"
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
                {loadingSales ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        data={sales.filter((sale) =>
                            sale.clientName.toLowerCase().includes(filter.toLowerCase()) ||
                            sale.serviceName.toLowerCase().includes(filter.toLowerCase())
                        )}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View
                                style={{
                                    padding: 16,
                                    backgroundColor: theme.colors.input.background,
                                    borderRadius: 8,
                                    marginBottom: 8,
                                }}
                            >
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text size={16} weight="bold" style={{ marginBottom: 4 }}>
                                            {item.clientName}
                                        </Text>
                                        <Text size={14} color={theme.colors.text.secondary}>
                                            {item.serviceName}
                                        </Text>
                                        <Text size={12} color={theme.colors.text.secondary} style={{ marginTop: 4 }}>
                                            {item.paymentMethod}
                                        </Text>
                                    </View>
                                    <View style={{ alignItems: "flex-end" }}>
                                        <Text size={18} weight="bold" color={theme.colors.success.text}>
                                            {formatToBRL(item.value)}
                                        </Text>
                                        <Text size={12} color={theme.colors.text.secondary} style={{ marginTop: 4 }}>
                                            {new Date(item.date).toLocaleDateString("pt-BR")}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                        ListEmptyComponent={
                            <View style={{ padding: 20, alignItems: "center" }}>
                                <Text color={theme.colors.text.secondary}>
                                    Nenhuma venda registrada
                                </Text>
                            </View>
                        }
                    />
                )}
            </ContentBlock>
        </Container>
    );
}
