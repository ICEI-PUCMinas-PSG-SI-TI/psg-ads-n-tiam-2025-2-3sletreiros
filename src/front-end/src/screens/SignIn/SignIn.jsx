import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input/InputField";
import { Text } from "../../components/Text/Text";
import { Container, NotLoggedLogo } from "../../styles/global";
import { useReducer, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

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
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function SignIn() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isLoading, setIsLoading] = useState(false)
  
  const navigation = useNavigation()
  const { register } = useAuth()

  async function handleSubmit() {
    setIsLoading(true)

    if (!validateFields()) {
        setIsLoading(false)
        return
    }

    try {
        const response = await register(state.email, state.password, state.name)
        navigation.navigate('Login')
    } catch (error) {
        alert('Não foi possível criar conta. Por favor, tente novamente.')
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
    if (!state.password || state.password.length < 6) {
      dispatch({ type: "SET_ERROR", field: "password", value: "Senha muito curta" });
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

    if (!hasError) {
      dispatch({ type: "RESET" });
      return true
    } else {
      return false
    }
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
          <NotLoggedLogo
            source={require('../../../assets/LogoHome.png')}
            width={50}
            height={50}
          />

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
            secureTextEntry
          />

          <Button
            buttonStyle="primary"
            size="large"
            flex={true}
            onPress={handleSubmit}
            loading={isLoading}
          >
            Cadastrar
          </Button>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
