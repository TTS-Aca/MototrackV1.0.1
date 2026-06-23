import { EditProfileScreen } from '@/components/mototrack/modules/edit-profile-screen';
import { AuthGate } from '@/components/mototrack/auth-gate';

export default function EditProfileRoute() {
  return (
    <AuthGate>
      <EditProfileScreen />
    </AuthGate>
  );
}
