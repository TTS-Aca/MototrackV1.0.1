import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { MobileDashboard } from '@/components/mototrack/mobile-dashboard';
import { WorkshopDashboard } from '@/components/mototrack/workshop-dashboard';
import { useAuth } from '@/contexts/auth-context';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';

export default function HomeScreen() {
  const { isAuthenticated, isLoading, accountType } = useAuth();
  const { theme } = useMotoTrackTheme();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator color={theme.orange500} />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  if (accountType === 'workshop') {
    return <WorkshopDashboard />;
  }

  return <MobileDashboard />;
}
