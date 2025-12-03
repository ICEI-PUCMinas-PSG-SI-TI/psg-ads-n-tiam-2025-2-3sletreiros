import { Container } from "src/styles/global"
import { InputField } from "@components/Input/InputField"
import { Button } from "@components/Button/Button"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { useFlashMessage } from "@hooks/useFlashMessage";
import { View } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@config/firebase";
import { useAuth } from "@hooks/useAuth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export function CreateService() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()
    const { showFlashMessage } = useFlashMessage()
    const { user } = useAuth()

    const handleNameChange = (text) => setName(text);
    
    const handlePriceChange = (text) => {
        // Remove tudo exceto números
        const numbers = text.replace(/\D/g, '');
        
        if (numbers === '') {
            setPrice('');
            return;
        }
        
        // Converte para número e divide por 100 para ter os centavos
        const value = parseFloat(numbers) / 100;
        
        // Formata no padrão brasileiro
        const formatted = value.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        setPrice(formatted);
    };

    async function addService() {
        if (!name.trim()) {
            showFlashMessage('Por favor, informe o nome do serviço', 'error')
            return
        }

        if (!price) {
            showFlashMessage('Por favor, informe um valor válido', 'error')
            return
        }

        setLoading(true)
        try {
            // Remove pontos de milhar e substitui vírgula por ponto
            const priceValue = parseFloat(price.replace(/\./g, '').replace(',', '.'))
            
            if (isNaN(priceValue) || priceValue <= 0) {
                showFlashMessage('Por favor, informe um valor válido', 'error')
                setLoading(false)
                return
            }
            
            await addDoc(collection(db, "company", user?.uid, "services"), {
                name: name.trim(),
                description: description.trim(),
                price: priceValue,
                createdAt: new Date().toISOString()
            })

            showFlashMessage('Serviço adicionado com sucesso!', 'success')
            navigation.goBack()
        } catch (error) {
            console.error(error)
            showFlashMessage(error.message || 'Erro ao adicionar serviço', 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
            showsVerticalScrollIndicator={false}
        >
            <Container>
                <InputField
                    label="Nome do serviço"
                    placeholder="Ex: Corte de cabelo"
                    value={name}
                    onChangeText={handleNameChange}
                />

                <InputField
                    label="Preço"
                    placeholder="0,00"
                    value={price}
                    onChangeText={handlePriceChange}
                    keyboardType="numeric"
                />

                <InputField
                    label="Descrição (opcional)"
                    placeholder="Descreva o serviço"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />

                <View style={{ height: 50 }} />

                <Button
                    buttonStyle={'primary'}
                    onPress={addService}
                    icon={'done'}
                    loading={loading}
                    fullWidth
                    flex
                >
                    Adicionar Serviço
                </Button>
            </Container>
        </KeyboardAwareScrollView>
    )
}
