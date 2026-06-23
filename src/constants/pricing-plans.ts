export type PricingPlan = {
  id: 'freemium' | 'plus' | 'pro';
  name: string;
  price: string;
  priceNote?: string;
  features: string;
  highlighted?: boolean;
};

export const PRICING_TAGLINE =
  'Empieza gratis y escala cuando necesites más potencia para tu moto.';

export const PRICING_PLANS: readonly PricingPlan[] = [
  {
    id: 'freemium',
    name: 'FREEMIUM',
    price: '$0',
    priceNote: 'MXN / mes',
    features: '2 motos, datos locales (SQLite offline), anuncios no invasivos.',
  },
  {
    id: 'plus',
    name: 'PLUS',
    price: '$199',
    priceNote: 'MXN / mes',
    features: 'Nube, IA básica, sin anuncios.',
    highlighted: true,
  },
  {
    id: 'pro',
    name: 'PRO',
    price: '$399',
    priceNote: 'MXN / mes',
    features: 'IA avanzada, predicción, certificación digital, ventaja en Marketplace.',
  },
] as const;

export const PRICING_ROWS = [
  { key: 'price', label: 'Mensualidad' },
  { key: 'features', label: 'Características' },
] as const;
