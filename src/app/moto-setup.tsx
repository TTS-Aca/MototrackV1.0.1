import { AuthGate } from '@/components/mototrack/auth-gate';
import { MotorcycleSetupScreen } from '@/components/mototrack/modules/motorcycle-setup-screen';

export default function MotoSetupPage() {
  return (
    <AuthGate>
      <MotorcycleSetupScreen />
    </AuthGate>
  );
}
