import { Container } from "../../styles/global"
import { InputField } from "../../components/Input/InputField"
import { Button } from "../../components/Button/Button"
import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { useFlashMessage } from "../../hooks/useFlashMessage";
import { CLOUDINARY_URL, UPLOAD_PRESET } from '@env'
import {CustomModal} from "../../components/CustomModal/CustomModal"
import * as ImagePicker from 'expo-image-picker'
import { Image, View } from "react-native";
import { addDoc, collection, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../hooks/useAuth";

export function CreateProduct(){
    const [name, setName] = useState("")
    const [stock, setStock] = useState(0)
    const [description, setDescription] = useState(0)
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")

    const [imageUri, setImageUri] = useState("")
    const [showPreviewModal, setShowPreviewModal] = useState(false)
    const [imageData, setImageData] = useState({})

    const [creatingProduct, setCreatingProduct] = useState(false)

    const [uploadingImage, setUploadingImage] = useState(false)
    const [imageUrl, setImageUrl] = useState(false)

    const navigation = useNavigation()

    const {showFlashMessage} = useFlashMessage()

    const {user} = useAuth()

    const handleNameChange = (text) => setName(text);
    const handlePriceChange = (text) => setPrice(text);

    async function addProduct(){
        setCreatingProduct(true)
        try {
            const imageUrl = await uploadImage(imageUri)
            const createdProductRef = addDoc(collection(db, "company", user?.uid, "products"), {
                name,
                stock,
                description,
                category,
                image: imageUrl,
                price
            })
            showFlashMessage('Produto adicionado com sucesso!', 'success')
            navigation.goBack()
        } catch (error) {
            console.error(error)
            showFlashMessage(error.message, 'error')
        } finally {
            setCreatingProduct(false)
        }
    }

    async function pickImage() {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

            if (status !== 'granted') {
                showFlashMessage('Permissão negada, não será possível carregar a imagem da galeria.', 'error')
                return
            }

            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4,4],
                quality: 0.8
            })

            if (!response.canceled) {
                setImageData(response.assets[0])
                setImageUri(response.assets[0].uri)
                setShowPreviewModal(true)
            }
        } catch (error) {
            console.error(error)
            showFlashMessage('Erro ao acessar galeria', 'error')
        }
    }

    async function uploadImage(uri){
        try {
            const formData = new FormData()

            const file = uri.split('/').pop()
            const match = /\.(\w+)$/.exec(file);
            const type = match ? `image/${match[1]}` : 'image/jpeg';

            formData.append('file', {
                uri: uri,
                type: type,
                name: file,
            });

            formData.append('upload_preset', UPLOAD_PRESET);

            const response = await fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: formData,
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });

            const data = await response.json();

            if (response.ok) {
                return data.secure_url
            } else {
                throw new Error(data?.error?.message || 'Erro ao enviar foto.')
            }
        } catch (error) {
            console.error(error)
            throw new Error('Erro ao enviar imagem do produto.')
        }
    }

    return(
        <Container>
            <CustomModal
                visible={showPreviewModal}
                onClose={() => setShowPreviewModal(false)}
            >
                <View style={{alignItems: 'center', gap: 10}}>
                    {imageUri && 
                        <Image 
                            source={{uri: imageUri}}
                            style={{
                                width: '60%',
                                aspectRatio: imageData.width / imageData.height,
                                borderRadius: 12
                            }}
                            resizeMode="contain"    
                    />}
                    <View style={{flexDirection: 'row', gap: 10}}>
                        <Button buttonStyle={'error'} style={{flex: 1}}>Trocar</Button>
                        <Button buttonStyle={'primary'} style={{flex: 1}} onPress={() => setShowPreviewModal(false)}>Confirmar</Button>
                    </View>
                </View>
            </CustomModal>
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
            /> 

            <InputField
                label="Categoria"
                value={category}
                onChangeText={setCategory}
            />

            <Button
                buttonStyle={'primary'}
                flex
                onPress={() => pickImage()}
                loading={uploadingImage}
                icon={'upload'}
            >
                Carregar imagem
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