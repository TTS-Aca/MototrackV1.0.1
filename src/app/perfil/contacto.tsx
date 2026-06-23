import { ContactSupportScreen } from '@/components/mototrack/modules/contact-support-screen';
import { AuthGate } from '@/components/mototrack/auth-gate';

export default function ContactRoute() {
  return (
    <AuthGate>
      <ContactSupportScreen />
    </AuthGate>
  );
}
