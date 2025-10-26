import { useState } from "react";
import { useTheme } from "styled-components";
import { Container, InputContainer, Label, StyledInput, ErrorText, IconArea } from "./style";

export function InputField({
    label,
    icon,
    error,
    style,
    onChangeText,
    value,
    placeholder,
    secureTextEntry,
    editable = true,
    keyboardType = "default",
    ...rest
}) {
    const theme = useTheme();
    const [focused, setFocused] = useState(false);

    return (
        <Container style={style}>
            {label && <Label>{label}</Label>}

            <InputContainer
                focused={focused}
                hasError={!!error}
                editable={editable}
            >
                {icon && <IconArea>{icon}</IconArea>}

                <StyledInput
                    placeholder={placeholder}
                    placeholderTextColor={theme.colors.text.secondary}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    secureTextEntry={secureTextEntry}
                    editable={editable}
                    keyboardType={keyboardType}
                    {...rest}
                />
            </InputContainer>

            {error && <ErrorText>{error}</ErrorText>}
        </Container>
    );
}
