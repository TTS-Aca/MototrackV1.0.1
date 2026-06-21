import type { DaySchedule, WorkshopBrand } from '@/types/workshop';

export const WORKSHOP_BRANDS: readonly WorkshopBrand[] = [
  'Honda',
  'Yamaha',
  'Benelli',
  'Multimarca',
] as const;

export const OFFICIAL_BRANDS: readonly WorkshopBrand[] = ['Honda', 'Yamaha', 'Benelli'] as const;

export const WEEK_DAYS = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
] as const;

export function defaultSchedule(): DaySchedule[] {
  return WEEK_DAYS.map((day) => ({
    day,
    open: '09:00',
    close: '18:00',
    closed: day === 'Domingo',
  }));
}

export const DEFAULT_MAP_CENTER = {
  latitude: 21.1619,
  longitude: -86.8515,
};
