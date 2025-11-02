import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { Container, InputContainer, Label, StyledInput, ErrorText, IconArea } from "./style";
import { MaskedTextInput } from "react-native-mask-text";

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
    mask,
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

                {mask ? (
                    <MaskedTextInput
                        mask={mask}
                        value={value}
                        onChangeText={(masked, raw) => {
                            onChangeText(raw);
                        }}
                        placeholder={placeholder}
                        placeholderTextColor={theme.colors.input.text}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        secureTextEntry={secureTextEntry}
                        editable={editable}
                        keyboardType={keyboardType}
                        style={{
                            flex: 1,
                            color: theme.colors.text.primary,
                            paddingVertical: 12,
                            paddingHorizontal: 8,
                        }}
                        {...rest}
                    />
                ) : (
                    <StyledInput
                        placeholder={placeholder}
                        placeholderTextColor={theme.colors.input.text}
                        value={value}
                        onChangeText={onChangeText}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        secureTextEntry={secureTextEntry}
                        editable={editable}
                        keyboardType={keyboardType}
                        {...rest}
                    />
                )}
            </InputContainer>

            {error && <ErrorText>{error}</ErrorText>}
        </Container>
    );
}
