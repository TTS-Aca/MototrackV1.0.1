import { MotoStatusScreen } from '@/components/mototrack/modules/moto-status-screen';
import { AuthGate } from '@/components/mototrack/auth-gate';

export default function MotoStatusRoute() {
  return (
    <AuthGate>
      <MotoStatusScreen />
    </AuthGate>
  );
}
