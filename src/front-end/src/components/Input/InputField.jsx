import { useState } from "react";
import { useTheme } from "styled-components";
import { TouchableOpacity } from "react-native"; 
import { Container, InputContainer, Label, StyledInput, ErrorText } from "@components/Input/style";
import { MaskedTextInput } from "react-native-mask-text";
import { Icon } from "@components/Icon/Icon";

export function InputField({
    label,
    error,
    style,
    onChangeText,
    value,
    placeholder,
    secureTextEntry,
    editable = true,
    keyboardType = "default",
    mask,
    rightIconName,
    onPressRightIcon,
    ...rest
}) {
    const theme = useTheme();
    const [focused, setFocused] = useState(false);

    const isRightIconClickable = !!rightIconName && !!onPressRightIcon;

    return (
        <Container style={style}>
            {label && <Label>{label}</Label>}

            <InputContainer
                focused={focused}
                hasError={!!error}
                editable={editable}
            >
                {mask ? (
                    <MaskedTextInput
                        mask={mask}
                        value={value}
                        onChangeText={(masked, raw) => {
                            onChangeText(raw);
                        }}
                        placeholder={placeholder}
                        placeholderTextColor="#6B6B6B"
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
                        placeholderTextColor="#6B6B6B"
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
                
                {rightIconName && (
                    <TouchableOpacity 
                        onPress={onPressRightIcon} 
                        disabled={!isRightIconClickable} 
                        style={{
                            padding: 8,
                            opacity: editable ? 1 : 0.6,
                        }}
                    >
                        <Icon name={rightIconName} size={16} color={theme.colors.text.secondary} />
                    </TouchableOpacity>
                )}

            </InputContainer>

            {error && <ErrorText>{error}</ErrorText>}
        </Container>
    );
}