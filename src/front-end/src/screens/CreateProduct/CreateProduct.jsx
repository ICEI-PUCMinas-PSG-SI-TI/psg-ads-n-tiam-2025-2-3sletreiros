import { Container } from "src/styles/global"
import { InputField } from "@components/Input/InputField"
import { Button } from "@components/Button/Button"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { useFlashMessage } from "@hooks/useFlashMessage";
import {CustomModal as PreviewImageModal} from "@components/CustomModal/CustomModal"
import * as ImagePicker from 'expo-image-picker'
import { Image, View } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@config/firebase";
import { useAuth } from "@hooks/useAuth";
import { BottomPickerModal } from "@components/BottomPickerModal/BottomPickerModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useImage } from "@hooks/useImage";
import { CreatingProductAnimation } from "@components/CreatingProductAnimation/CreatingProductAnimation";

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
    const {uploadImage, pickImage, takeImage} = useImage()

    const handleNameChange = (text) => setName(text);

    const handleStockChange = (text) => {

        if (text === "") {
            setStock(0);
            return;
        }

        const numericValue = Number(text);

        setStock(numericValue);
    }

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

    async function pickPhoto() {
        try {
            const response = await pickImage()

            setImageData(response.assets[0])
            setImageUri(response.assets[0].uri)
            setShowPreviewModal(true)
        } catch (error) {
            showFlashMessage('Permissão negada, não será possível carregar a imagem da galeria.', 'error')
        }
    }

    async function takePhoto() {
        try {
            const response = await takeImage()

            setImageData(response.assets[0])
            setImageUri(response.assets[0].uri)
            setShowPreviewModal(true)
        } catch (error) {
            console.error(error)
            showFlashMessage(error.message || 'Ocorreu um erro ao tirar a foto. Por favor, tente novamente', 'error')
        }
    }

    async function pickCamera() {
        setShowPickerModal(false)
        await takePhoto()
    }

    async function pickGallery() {
        setShowPickerModal(false)
        await pickPhoto()
    }

    if (creatingProduct)
        return <CreatingProductAnimation />

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
