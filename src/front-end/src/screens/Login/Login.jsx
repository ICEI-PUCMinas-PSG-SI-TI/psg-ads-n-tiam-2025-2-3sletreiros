import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input/InputField";
import { Container } from "../../styles/global";
import { useReducer, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { NotLoggedLogo } from "../../components/NotLoggedLogo/NotLoggedLogo";

const initialState = {
  email: "",
  password: "",
  error: {
    email: "",
    password: ""
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

export function Login() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const navigation = useNavigation();
  const { login } = useAuth();

  async function handleSubmit() {
    setIsLoading(true);
    if (!validateFields()) {
      setIsLoading(false);
      return;
    }
    try {
      await login(state.email, state.password);
      navigation.navigate("Home");
    } catch (error) {
      alert("Não foi possível fazer login. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  function validateFields() {
    let hasError = false;
    if (!state.email.includes("@")) {
      dispatch({ type: "SET_ERROR", field: "email", value: "E-mail inválido." });
      hasError = true;
    }
    if (!state.password || state.password.length < 6) {
      dispatch({ type: "SET_ERROR", field: "password", value: "Senha inválida." });
      hasError = true;
    }
    if (!hasError) {
      dispatch({ type: "RESET" });
      return true;
    } else {
      return false;
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
          <NotLoggedLogo />

          <InputField
            label="E-mail"
            placeholder="empresa@gmail.com"
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
            secureTextEntry={!showPassword}
            rightIconName={showPassword ? 'visibility' : 'visibility-off'}
            onPressRightIcon={() => {setShowPassword((prev) => !prev)}}
          />

          <Button
            buttonStyle="primary"
            size="large"
            flex={true}
            onPress={handleSubmit}
            loading={isLoading}
            icon={'login'}
          >
            Entrar
          </Button>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
