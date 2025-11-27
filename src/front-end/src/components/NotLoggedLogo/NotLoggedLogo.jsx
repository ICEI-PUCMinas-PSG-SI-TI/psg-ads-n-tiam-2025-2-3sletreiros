import { useColorScheme } from "react-native";
import { Logo } from "../../styles/global";

export function NotLoggedLogo() {
    const deviceTheme = useColorScheme()

    return (
        <>
        {
            deviceTheme === 'light' ? 
            <Logo source={require('../../../assets/images/LogoHomeLight.png')} width={50} height={50}/> : 
            <Logo source={require('../../../assets/images/LogoHome.png')} width={50} height={50}/>
        }
        </>
    )
}