export type MotoHealthLevel = 'optimal' | 'attention' | 'critical';

export type MotoHealthCheck = {
  label: string;
  status: MotoHealthLevel;
  detail: string;
};

export type MonthlyExpenseItem = {
  category: 'Gasolina' | 'Servicio' | 'Refacción';
  amount: number;
  percent: number;
};

export type AiInsight = {
  id: string;
  title: string;
  body: string;
  highlight?: string;
  priority: 'high' | 'medium' | 'low';
};

export const MOTO_STATUS = {
  level: 'optimal' as MotoHealthLevel,
  label: 'Óptima',
  summary: 'Tu moto está en buen estado general. Mantén el ritmo de servicios programados.',
  checks: [
    { label: 'Aceite', status: 'optimal', detail: 'Cambio al día · 320 km restantes' },
    { label: 'Frenos', status: 'optimal', detail: 'Pastillas con 68% de vida útil' },
    { label: 'Llantas', status: 'attention', detail: 'Revisar presión en 1 semana' },
    { label: 'Batería', status: 'optimal', detail: 'Carga estable · sin alertas' },
  ] satisfies MotoHealthCheck[],
};

export const MONTHLY_EXPENSE = {
  total: 7.65,
  currency: 'MXN',
  trendPercent: 22,
  trendLabel: 'vs jun',
  trendDirection: 'up' as const,
  items: [
    { category: 'Gasolina', amount: 4.2, percent: 55 },
    { category: 'Servicio', amount: 2.1, percent: 27 },
    { category: 'Refacción', amount: 1.35, percent: 18 },
  ] satisfies MonthlyExpenseItem[],
};

export const AI_INSIGHTS = {
  headline: {
    title: 'Próximamente',
    teaser: 'El análisis con IA estará disponible pronto.',
    body: 'Podrás ver patrones de gasto y recomendaciones personalizadas para tu moto según tus registros.',
  },
  insights: [] satisfies AiInsight[],
};

export function formatCurrency(amount: number, currency = 'MXN'): string {
  return `$${amount.toFixed(2)} ${currency === 'MXN' ? '' : currency}`.trim();
}
