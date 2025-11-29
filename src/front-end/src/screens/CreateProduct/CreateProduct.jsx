import { Container } from "src/styles/global"
import { InputField } from "@components/Input/InputField"
import { Button } from "@components/Button/Button"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { useFlashMessage } from "@hooks/useFlashMessage";
import { CLOUDINARY_URL, UPLOAD_PRESET } from '@env'
import {CustomModal as PreviewImageModal} from "@components/CustomModal/CustomModal"
import * as ImagePicker from 'expo-image-picker'
import { Image, View } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@config/firebase";
import { useAuth } from "@hooks/useAuth";
import { BottomPickerModal } from "@components/BottomPickerModal/BottomPickerModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export function CreateProduct(){
    const [name, setName] = useState("")
    const [stock, setStock] = useState(0)
    const [description, setDescription] = useState(0)
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState("")
    const [showPickerModal, setShowPickerModal] = useState(false)

    const [imageUri, setImageUri] = useState("")
    const [showPreviewModal, setShowPreviewModal] = useState(false)
    const [imageData, setImageData] = useState({})

    const [creatingProduct, setCreatingProduct] = useState(false)

    const [uploadingImage, setUploadingImage] = useState(false)

    const navigation = useNavigation()

    const {showFlashMessage} = useFlashMessage()

    const {user} = useAuth()

    const handleNameChange = (text) => setName(text);
    const handlePriceChange = (text) => setPrice(text);

    async function addProduct(){
        setCreatingProduct(true)
        try {
            setUploadingImage(true)
            const image = await uploadImage(imageUri)
            await addDoc(collection(db, "company", user?.uid, "products"), {
                name,
                stock,
                description,
                category,
                image,
                price
            })
            setUploadingImage(false)
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

    async function takePhoto() {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync()

            if (status !== 'granted'){
                showFlashMessage('Permissão negada, não será possível abrir a câmera do dispotivo.', 'error')
                return
            }
                
            const response = await ImagePicker.launchCameraAsync({
                aspect: [4,3],
                quality: 0.8
            })

            if (!response.canceled) {
                setImageData(response.assets[0])
                setImageUri(response.assets[0].uri)
                setShowPreviewModal(true)
            }
        } catch (error) {
            showFlashMessage(error.message || 'Ocorreu um erro ao tirar a foto. Por favor, tente novamente', 'error')
        }
    }

    async function pickCamera() {
        setShowPickerModal(false)
        await takePhoto()
    }

    async function pickGallery() {
        setShowPickerModal(false)
        await pickImage()
    }

    return(
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
            showsVerticalScrollIndicator={false}
        >
            <Container>

                <PreviewImageModal
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
                            <Button 
                                buttonStyle={'error'} 
                                fullWidth 
                                onPress={() => {
                                    setShowPreviewModal(false)
                                    setImageUri("")
                                    setShowPickerModal(true)
                                }}
                            >
                                Trocar
                            </Button>
                            <Button 
                                buttonStyle={'primary'} 
                                fullWidth 
                                onPress={() => setShowPreviewModal(false)}
                            >
                                Confirmar
                            </Button>
                        </View>
                    </View>
                </PreviewImageModal>

                <BottomPickerModal 
                    visible={showPickerModal}
                    onClose={() => setShowPickerModal(false)}
                    onPickCamera={pickCamera}
                    onPickGallery={pickGallery}
                />

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
                    buttonStyle={'surface'}
                    flex
                    onPress={() => setShowPickerModal(true)}
                    loading={uploadingImage}
                    icon={'upload'}
                >
                    Carregar imagem
                </Button>

                <View style={{ height: 50 }} />

                <Button
                    buttonStyle={'primary'}
                    onPress={addProduct}
                    icon={'done'}
                    loading={creatingProduct}
                    fullWidth
                    flex
                />

            </Container>
        </KeyboardAwareScrollView>
    )
}
