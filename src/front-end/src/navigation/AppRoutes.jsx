import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from "@hooks/useAuth";
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from 'styled-components';
import { AuthenticatedRoutes } from "@navigation/AuthenticatedRoutes";
import { PublicRoutes } from "@navigation/PublicRoutes";

export default function AppRoutes() {
  const {user, loading} = useAuth()
  const theme = useTheme()

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.colors.primary}/>
        </View>
      );
    }

  return user ? <AuthenticatedRoutes /> : <PublicRoutes />
}
