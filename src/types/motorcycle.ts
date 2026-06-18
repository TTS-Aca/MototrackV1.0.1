export type Motorcycle = {
  brand: string;
  model: string;
  year: string;
  mileage: string;
  fuelType: string;
  lastOilChangeKm?: string;
  plates?: string;
  nickname?: string;
  createdAt: string;
};

export function motorcycleDisplayName(moto: Motorcycle): string {
  return `${moto.brand} ${moto.model}`.trim().toUpperCase();
}
