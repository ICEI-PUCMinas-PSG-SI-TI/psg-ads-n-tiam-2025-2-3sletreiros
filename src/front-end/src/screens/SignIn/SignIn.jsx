import { KeyboardAvoidingView, ScrollView, Platform, View, Text } from "react-native";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input/InputField";
import { Container } from "../../styles/global";
import { useReducer, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { NotLoggedLogo } from "../../components/NotLoggedLogo/NotLoggedLogo";
import { InputError } from "../../error/InputError";
import { Icon } from "../../components/Icon/Icon";
import { darkTheme } from "../../theme/theme";

const initialState = {
  email: "",
  password: "",
  name: "",
  social: "",
  cnpj: "",
  error: {
    email: "",
    password: "",
    name: "",
    social: "",
    cnpj: "",
  }
};

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        error: {
          ...state.error,
          [action.field]: ""
        }
      };
    case "SET_ERROR":
      return {
        ...state,
        error: {
          ...state.error,
          [action.field]: action.value
        }
      };

    default:
      return state;
  }
}

export function SignIn() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isLoading, setIsLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  
  const { register } = useAuth()

  async function handleSubmit() {
    setIsLoading(true)

    if (!validateFields()) {
        setIsLoading(false)
        return
    }

    const {email, password, name, social, cnpj} = state

    try {
        await register(email, password, name, {email, name, social, cnpj})
    } catch (error) {
        if (error instanceof InputError)
          dispatch({ type: "SET_ERROR", field: error.field, value: error.message })
    } finally {
        setIsLoading(false)
    }
  }

  function validateFields() {
    let hasError = false;

    if (!state.email.includes("@")) {
      dispatch({ type: "SET_ERROR", field: "email", value: "E-mail inválido" });
      hasError = true;
    }

    if (!state.password || state.password.length < 8) {
      dispatch({ type: "SET_ERROR", field: "password", value: "Senha muito curta" });
      hasError = true;
    } else if (!/[A-Z]/.test(state.password) || !/[a-z]/.test(state.password) || !/[0-9]/.test(state.password)) {
      dispatch({
        type: "SET_ERROR",
        field: "password",
        value: "A senha deve ter letra maiúscula, minúscula e número"
      });
      hasError = true;
    }

    if (!state.name) {
      dispatch({ type: "SET_ERROR", field: "name", value: "Nome obrigatório" });
      hasError = true;
    }
    if (!state.social) {
      dispatch({ type: "SET_ERROR", field: "social", value: "Razão social obrigatória" });
      hasError = true;
    }
    if (!state.cnpj || state.cnpj.length !== 14) {
      dispatch({ type: "SET_ERROR", field: "cnpj", value: "CNPJ inválido" });
      hasError = true;
    }

    return !hasError
  }

  function getPasswordValidation(password) {
    return {
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasLength: password.length >= 8
    };
  }


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <NotLoggedLogo />

          <InputField
            label="Nome"
            placeholder="Seu nome"
            value={state.name}
            onChangeText={(text) => dispatch({ type: "SET_FIELD", field: "name", value: text })}
            error={state.error.name}
          />

          <InputField
            label="Razão Social"
            placeholder="Sua empresa"
            value={state.social}
            onChangeText={(text) => dispatch({ type: "SET_FIELD", field: "social", value: text })}
            error={state.error.social}
          />

          <InputField
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            value={state.cnpj}
            onChangeText={(text) => dispatch({ type: "SET_FIELD", field: "cnpj", value: text })}
            error={state.error.cnpj}
            keyboardType="numeric"
            mask="99.999.999/9999-99"
          />

          <InputField
            label="E-mail"
            placeholder="empresa@empresa.com"
            value={state.email}
            onChangeText={(text) => dispatch({ type: "SET_FIELD", field: "email", value: text })}
            error={state.error.email}
            keyboardType="email-address"
          />

          <InputField
            label="Senha"
            placeholder="********"
            value={state.password}
            onChangeText={(text) => dispatch({ type: "SET_FIELD", field: "password", value: text })}
            error={state.error.password}
            secureTextEntry={!showPass}
            rightIconName={showPass ? 'visibility' : 'visibility-off'}
            onPressRightIcon={() => setShowPass(prev => !prev)}
          />

          {state.password.length > 0 && (
            <View style={{ marginBottom: 16 }}>
              {[
                { key: "hasUpper", label: "Letra maiúscula" },
                { key: "hasLower", label: "Letra minúscula" },
                { key: "hasNumber", label: "Número" },
                { key: "hasLength", label: "Ao menos 8 caracteres" },
              ].map((item) => {
                const validations = getPasswordValidation(state.password);
                const valid = validations[item.key];

                return (
                  <View
                    key={item.key}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 2,
                    }}
                  >
                    <Icon
                      name={valid ? "check" : "error"}
                      color={valid ? darkTheme.colors.success.background : darkTheme.colors.error.background}
                      size={16}
                    />

                    <Text
                      style={{
                        color: valid ? darkTheme.colors.success.background : darkTheme.colors.error.background,
                        fontSize: 14,
                        marginLeft: 6,
                      }}
                    >
                      {item.label}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}

          <Button
            buttonStyle="primary"
            size="large"
            flex={true}
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
          >
            Cadastrar
          </Button>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
