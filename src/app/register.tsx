import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { RegisterScreen } from '@/components/mototrack/auth/register-screen';
import { useAuth } from '@/contexts/auth-context';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';

export default function RegisterPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const { theme } = useMotoTrackTheme();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator color={theme.orange500} />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

  return <RegisterScreen />;
}
