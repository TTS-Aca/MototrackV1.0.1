import { AuthGate } from '@/components/mototrack/auth-gate';
import { RefaccionRecordScreen } from '@/components/mototrack/modules/refaccion-record-screen';

export default function RefaccionPage() {
  return (
    <AuthGate>
      <RefaccionRecordScreen />
    </AuthGate>
  );
}
