import { WorkshopProfileScreen } from '@/components/mototrack/modules/workshop-profile-screen';
import { AuthGate } from '@/components/mototrack/auth-gate';

export default function TallerProfileRoute() {
  return (
    <AuthGate>
      <WorkshopProfileScreen />
    </AuthGate>
  );
}
