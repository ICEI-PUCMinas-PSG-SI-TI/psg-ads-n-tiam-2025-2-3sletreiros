import { KeyboardAvoidingView, ScrollView, Platform, View } from "react-native";
import { Button } from "@components/Button/Button";
import { InputField } from "@components/Input/InputField";
import { Container, ContentBlock } from "../../styles/global";
import { Text } from "@components/Text/Text";
import { useReducer, useState, useEffect } from "react";
import { useAuth } from "@hooks/useAuth";
import { useFlashMessage } from "@hooks/useFlashMessage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import { useNavigation } from "@react-navigation/native";

const initialState = {
  email: "",
  name: "",
  social: "",
  cnpj: "",
  error: {
    email: "",
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
    case "SET_INITIAL_DATA":
      return {
        ...state,
        email: action.data.email || "",
        name: action.data.name || "",
        social: action.data.social || "",
        cnpj: action.data.cnpj || "",
      };
    default:
      return state;
  }
}

export function EditProfile() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { user } = useAuth();
  const { showFlashMessage } = useFlashMessage();
  const navigation = useNavigation()

  useEffect(() => {
    loadUserData();
  }, [user]);

  async function loadUserData() {
    if (!user) {
      setIsLoadingData(false);
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, "company", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const formattedData = {
          ...userData,
          cnpj: userData.cnpj ? userData.cnpj.replace(/\D/g, "") : ""
        };
        dispatch({ type: "SET_INITIAL_DATA", data: formattedData });
      }
    } catch (error) {
      showFlashMessage("Erro ao carregar dados do usuário.", "error");
      console.error("Erro ao carregar dados:", error);
    } finally {
      setIsLoadingData(false);
    }
  }

  async function handleSubmit() {
    setIsLoading(true);

    if (!validateFields()) {
      setIsLoading(false);
      return;
    }

    if (!user) {
      showFlashMessage("Usuário não autenticado.", "error");
      setIsLoading(false);
      return;
    }

    try {
      const date = new Date();
      await updateDoc(doc(db, "company", user.uid), {
        name: state.name,
        email: state.email,
        social: state.social,
        cnpj: state.cnpj,
        updatedAt: date
      });

      showFlashMessage("Dados atualizados com sucesso!", "success");
    } catch (error) {
      showFlashMessage("Erro ao atualizar dados. Tente novamente.", "error");
      console.error("Erro ao atualizar:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function validateFields() {
    let hasError = false;

    if (!state.email.includes("@")) {
      dispatch({ type: "SET_ERROR", field: "email", value: "E-mail inválido" });
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

    return !hasError;
  }

  if (isLoadingData) {
    return null;
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
          <ContentBlock>
            <View style={{ marginBottom: 24 }}>
              <Text variant="title">Minha Conta</Text>
              <Text variant="body" style={{ marginTop: 8, opacity: 0.7 }}>
                Atualize suas informações pessoais e da empresa
              </Text>
            </View>
          </ContentBlock>

          <ContentBlock>
            <InputField
              label="Nome"
              placeholder="Seu nome"
              value={state.name}
              onChangeText={(text) => dispatch({ type: "SET_FIELD", field: "name", value: text })}
              error={state.error.name}
            />
          </ContentBlock>

          <ContentBlock>
            <InputField
              label="Razão Social"
              placeholder="Sua empresa"
              value={state.social}
              onChangeText={(text) => dispatch({ type: "SET_FIELD", field: "social", value: text })}
              error={state.error.social}
            />
          </ContentBlock>

          <ContentBlock>
            <InputField
              label="CNPJ"
              placeholder="00.000.000/0000-00"
              value={state.cnpj}
              onChangeText={(text) => dispatch({ type: "SET_FIELD", field: "cnpj", value: text })}
              error={state.error.cnpj}
              keyboardType="numeric"
              mask="99.999.999/9999-99"
            />
          </ContentBlock>

          <ContentBlock>
            <InputField
              label="E-mail"
              placeholder="empresa@empresa.com"
              value={state.email}
              onChangeText={(text) => dispatch({ type: "SET_FIELD", field: "email", value: text })}
              error={state.error.email}
              keyboardType="email-address"
            />
          </ContentBlock>

          <ContentBlock>
            <Button
              buttonStyle="primary"
              size="large"
              flex={true}
              onPress={() => {
                handleSubmit()
                navigation.navigate('MyAccount')
              }}
              loading={isLoading}
              disabled={isLoading}
            >
              Salvar Alterações
            </Button>
          </ContentBlock>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

