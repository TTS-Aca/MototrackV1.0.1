import { AuthGate } from '@/components/mototrack/auth-gate';
import { GasolinaRecordScreen } from '@/components/mototrack/modules/gasolina-record-screen';

export default function GasolinaPage() {
  return (
    <AuthGate>
      <GasolinaRecordScreen />
    </AuthGate>
  );
}
