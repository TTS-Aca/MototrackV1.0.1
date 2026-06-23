import { MyDataScreen } from '@/components/mototrack/modules/my-data-screen';
import { AuthGate } from '@/components/mototrack/auth-gate';

export default function MyDataRoute() {
  return (
    <AuthGate>
      <MyDataScreen />
    </AuthGate>
  );
}
