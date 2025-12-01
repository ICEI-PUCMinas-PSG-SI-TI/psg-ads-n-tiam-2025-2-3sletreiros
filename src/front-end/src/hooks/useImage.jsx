import * as ImagePicker from 'expo-image-picker'
import { CLOUDINARY_URL, UPLOAD_PRESET } from '@env'

export function useImage() {

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

    async function pickImage() {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

            if (status !== 'granted') {
                throw new Error('Permissão negada, não será possível carregar a imagem da galeria.')
            }

            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4,4],
                quality: 0.8
            })

            if (!response.canceled) 
                return response
        } catch (error) {
            throw new Error(error.message || 'Erro ao selecionar imagem. Por favor, tente novamente.')
        }
    }

    async function takeImage() {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync()

            if (status !== 'granted'){
                throw new Error('Permissão negada, não será possível usar a câmera para tirar foto')
            }
                
            const response = await ImagePicker.launchCameraAsync({
                aspect: [4,3],
                quality: 0.8
            })

            if (!response.canceled) 
                return response
        } catch (error) {
            console.error(error)
            throw new Error(error.message || 'Ocorreu um erro ao tirar a foto. Por favor, tente novamente')
        }
    }

    return {
        uploadImage,
        pickImage,
        takeImage
    }
}