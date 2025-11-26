import { Container } from "../../styles/global"
import { InputField } from "../../components/Input/InputField"
import { Button } from "../../components/Button/Button"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { useFlashMessage } from "../../hooks/useFlashMessage";
import { CLOUDINARY_URL, UPLOAD_PRESET } from '@env'
import * as ImagePicker from 'expo-image-picker'

export function CreateProduct(){
    const [name, setName] = useState("")
    const [stock, setStock] = useState(0)
    const [description, setDescription] = useState(0)
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")

    const [creatingProduct, setCreatingProduct] = useState(false)

    const [uploadingImage, setUploadingImage] = useState(false)
    const [imageUrl, setImageUrl] = useState(false)

    const navigation = useNavigation()
    const {showFlashMessage} = useFlashMessage()

    const handleNameChange = (text) => setName(text);
    const handlePriceChange = (text) => setPrice(text);

    function addProduct(){
        setCreatingProduct(true)
        showFlashMessage('Produto adicionado com sucesso!', 'success')
        navigation.navigate('Products')
    }

    async function pickImage() {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

            if (status !== granted) {
                showFlashMessage('Permissão negada, não será possível carregar a imagem da galeria.', 'error')
                return
            }
                
            showFlashMessage('Permissão concedida!', 'success')

            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4,3],
                quality: 0.8
            })

            if (!response.canceled)
                uploadImage(response.assets[0].uri)
        } catch (error) {
            showFlashMessage('Erro ao acessar galeria', 'error')
        }
    }

    async function uploadImage(uri){
        setUploadingImage(true)

        try {
            const formData = new FormData()

            const file = uri.split('/').pop()
        } catch (error) {
            
        }
    }

    return(
        <Container>

            <InputField
                label="Nome do produto"
                value={name}
                onChangeText={handleNameChange}
            /> 

            <InputField
                value={stock}
                label={'Estoque'}
                keyboardType="numeric"
                onChangeText={setStock}
            />
            
            <InputField
                label="Preço"
                value={price}
                onChangeText={handlePriceChange}
                keyboardType="numeric"
            /> 

            <InputField
                label="Descrição"
                value={description}
                onChangeText={setDescription}
                keyboardType="numeric"
            /> 

            <InputField
                label="Categoria"
                value={category}
                onChangeText={setCategory}
                keyboardType="numeric"
            />

            <Button
                buttonStyle={'primary'}
                flex
            >
                Carregar imagem do produto
            </Button>

            <Button
                buttonStyle={'success'}
                onPress={addProduct}
                style={{position: 'absolute', bottom: 15, left: 10, right: 10}}
                icon={'done'}
                loading={creatingProduct}
            />

        </Container>
    )
}