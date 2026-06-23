import { LegalDocumentScreen } from '@/components/mototrack/modules/legal-document-screen';
import { AuthGate } from '@/components/mototrack/auth-gate';

export default function PrivacyRoute() {
  return (
    <AuthGate>
      <LegalDocumentScreen type="privacy" />
    </AuthGate>
  );
}
