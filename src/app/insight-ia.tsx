import { AiInsightScreen } from '@/components/mototrack/modules/ai-insight-screen';
import { AuthGate } from '@/components/mototrack/auth-gate';

export default function AiInsightRoute() {
  return (
    <AuthGate>
      <AiInsightScreen />
    </AuthGate>
  );
}
