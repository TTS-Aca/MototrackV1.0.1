import { AuthGate } from '@/components/mototrack/auth-gate';
import { ServicioRecordScreen } from '@/components/mototrack/modules/servicio-record-screen';

export default function ServicioPage() {
  return (
    <AuthGate>
      <ServicioRecordScreen />
    </AuthGate>
  );
}
