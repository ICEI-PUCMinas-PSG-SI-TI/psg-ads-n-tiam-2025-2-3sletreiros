import { KeyboardAvoidingView, ScrollView, Platform, View, Text } from "react-native"
import { Button } from "../../components/Button/Button"
import { InputField } from "../../components/Input/InputField"
import { Container } from "../../styles/global"
import { useEffect, useReducer, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { NotLoggedLogo } from "../../components/NotLoggedLogo/NotLoggedLogo"
import { InputError } from "../../error/InputError"
import { Icon } from "../../components/Icon/Icon"
import { darkTheme } from "../../theme/theme"
import { InputContainer } from "./style"

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
  },
  address: {
    cep: "",
    street: "",
    city: "",
    state: "",
    country: "",
    neighborhood: ""
  }
}

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
        if (["cep", "street", "city", "state", "country", "neighborhood"].includes(action.field)) {
          return {
            ...state,
            address: {
              ...state.address,
              [action.field]: action.value
            },
            error: {
              ...state.error,
              [action.field]: ""
            }
          }
        }

      return {
        ...state,
        [action.field]: action.value,
        error: {
          ...state.error,
          [action.field]: ""
        }
      }
    case "SET_ERROR":
      return {
        ...state,
        error: {
          ...state.error,
          [action.field]: action.value
        }
      }

      case "SET_ADDRESS_FIELDS":
        return {
          ...state,
          address: {
            ...state.address,
            ...action.payload
          }
        }


    default:
      return state
  }
}

export function SignIn() {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  
  const { register } = useAuth()

  async function handleSubmit() {
    setIsLoading(true)

    if (!validateFields()) {
        setIsLoading(false)
        return
    }

    const {email, password, name, social, cnpj, address} = state

    try {
        await register(email, password, name, {email, name, social, cnpj, address})
    } catch (error) {
        if (error instanceof InputError)
          dispatch({ type: "SET_ERROR", field: error.field, value: error.message })
    } finally {
        setIsLoading(false)
    }
  }

  function validateFields() {
    let hasError = false

    if (!state.email.includes("@")) {
      dispatch({ type: "SET_ERROR", field: "email", value: "E-mail inválido" })
      hasError = true
    }

    if (!state.password || state.password.length < 8) {
      dispatch({ type: "SET_ERROR", field: "password", value: "Senha muito curta" })
      hasError = true
    } else if (!/[A-Z]/.test(state.password) || !/[a-z]/.test(state.password) || !/[0-9]/.test(state.password)) {
      dispatch({
        type: "SET_ERROR",
        field: "password",
        value: "A senha deve ter letra maiúscula, minúscula e número"
      })
      hasError = true
    }

    if (!state.name) {
      dispatch({ type: "SET_ERROR", field: "name", value: "Nome obrigatório" })
      hasError = true
    }

    if (!state.social) {
      dispatch({ type: "SET_ERROR", field: "social", value: "Razão social obrigatória" })
      hasError = true
    }

    if (!state.cnpj || state.cnpj.length !== 14) {
      dispatch({ type: "SET_ERROR", field: "cnpj", value: "CNPJ inválido" })
      hasError = true
    }

    if (!state.address.cep || state.address.cep.length !== 8) {
      dispatch({type: "SET_ERROR", field: "cep", value: "CEP inválido"})
      hasError = true
    }

    return !hasError
  }

  function getPasswordValidation(password) {
    return {
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasLength: password.length >= 8
    }
  }

  useEffect(() => {
    async function fetchCep() {
      if (state.address.cep.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${state.address.cep}/json/`)
          const data = await response.json()

          if (data.erro) return

          dispatch({
            type: "SET_ADDRESS_FIELDS",
            payload: {
              street: data.logradouro || "",
              neighborhood: data.bairro || "",
              city: data.localidade || "",
              state: data.estado || "",
              country: "Brasil"
            }
          })
        } catch (err) {
          console.log("Erro ao buscar CEP:", err)
        }
      }
    }


    fetchCep()
  }, [state.address.cep])


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
            label="CEP"
            placeholder="00.000-000"
            value={state.address.cep}
            onChangeText={(text) => dispatch({ type: "SET_FIELD", field: "cep", value: text })}
            error={state.error.cep}
            keyboardType="numeric"
            mask="99.999-999"
          />

          <InputContainer>
            <InputField
              label="Logradouro"
              placeholder="Avenida Brasil"
              value={state.address.street}
              onChangeText={(text) => dispatch({ type: "SET_FIELD", field: "street", value: text })}
              error={state.error.street}
              style={{flex: 1}}
            />
            <InputField
              label="Bairro"
              placeholder="Centro"
              value={state.address.neighborhood}
              onChangeText={(text) => dispatch({ type: "SET_FIELD", field: "neighborhood", value: text })}
              error={state.error.neighborhood}
              style={{flex: 1}}
            />
          </InputContainer>

          <InputContainer>
            <InputField
              label="Cidade"
              placeholder="Belo Horizonte"
              value={state.address.city}
              onChangeText={(text) => dispatch({ type: "SET_FIELD", field: "city", value: text })}
              error={state.error.city}
              style={{flex: 1}}
            />
            <InputField
              label="Estado"
              placeholder="MG"
              value={state.address.state}
              onChangeText={(text) => dispatch({ type: "SET_FIELD", field: "state", value: text })}
              error={state.error.state}
              style={{flex: 1}}
            />
          </InputContainer>

          <InputField
            label="País"
            placeholder="Brasil"
            value={state.address.country}
            onChangeText={(text) => dispatch({ type: "SET_FIELD", field: "country", value: text })}
            error={state.error.country}
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
                const validations = getPasswordValidation(state.password)
                const valid = validations[item.key]

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
                )
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
  )
}
