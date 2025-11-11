import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";


export function Icon({ name, size = 24, color }) {
    const theme = useTheme()

    return <MaterialIcons  name={name} size={size} color={!color ? theme.colors.buttonText : color}/>
}