import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";


export function Icon({ name, size = 24, color, family = 'MaterialIcons'}) {
    const theme = useTheme()

    switch(family){
        case('MaterialIcons'):
            return <MaterialIcons  name={name} size={size} color={!color ? theme.colors.buttonText : color}/>

        case('Feather'):
            return <Feather  name={name} size={size} color={!color ? theme.colors.buttonText : color}/>
    }
    
}