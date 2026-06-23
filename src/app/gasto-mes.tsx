import { MonthlyExpenseScreen } from '@/components/mototrack/modules/monthly-expense-screen';
import { AuthGate } from '@/components/mototrack/auth-gate';

export default function MonthlyExpenseRoute() {
  return (
    <AuthGate>
      <MonthlyExpenseScreen />
    </AuthGate>
  );
}
