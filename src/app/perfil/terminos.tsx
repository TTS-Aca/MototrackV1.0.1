import { LegalDocumentScreen } from '@/components/mototrack/modules/legal-document-screen';
import { AuthGate } from '@/components/mototrack/auth-gate';

export default function TermsRoute() {
  return (
    <AuthGate>
      <LegalDocumentScreen type="terms" />
    </AuthGate>
  );
}
