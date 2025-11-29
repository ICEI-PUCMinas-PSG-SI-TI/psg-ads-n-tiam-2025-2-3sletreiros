import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useFlashMessage } from "@hooks/useFlashMessage";
import { Container } from '../../styles/global';
import { InputField } from "@components/Input/InputField";
import { Button } from "@components/Button/Button";
import { NotLoggedLogo } from "@components/NotLoggedLogo/NotLoggedLogo";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { showFlashMessage } = useFlashMessage();

  const handleReset = async () => {
    if (!email) {
      showFlashMessage('Digite seu email', 'info');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      showFlashMessage('Link de recuperação enviado para o seu e-mail.', 'info');
      navigation.goBack();
    } catch (err) {
      const code = err.code || '';
      if (code.includes('invalid-email')) {
        showFlashMessage('Email inválido.', 'error');
      } else if (code.includes('user-not-found')) {
        showFlashMessage('Nenhum usuário encontrado com esse email.', 'error');
      } else {
        showFlashMessage('Erro ao enviar email. Tente novamente.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Container>
          <NotLoggedLogo />

          <InputField
            label="E-mail"
            placeholder="empresa@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Button
            buttonStyle="primary"
            size="large"
            flex={true}
            onPress={handleReset}
            loading={loading}
            style={{ marginTop: 20 }}
          >
            Enviar link
          </Button>

          <Button
            buttonStyle="tertiary"
            size="large"
            flex={true}
            onPress={() => navigation.goBack()}
            style={{ marginTop: 10 }}
          >
            Voltar
          </Button>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}