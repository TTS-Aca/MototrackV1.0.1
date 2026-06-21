export type WorkshopBrand = 'Honda' | 'Yamaha' | 'Benelli' | 'Multimarca';

export type DaySchedule = {
  day: string;
  open: string;
  close: string;
  closed: boolean;
};

export type Workshop = {
  name: string;
  taxId: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  brands: WorkshopBrand[];
  schedule: DaySchedule[];
  offersTowService: boolean;
  photos: string[];
  onVacation: boolean;
  vacationNote?: string;
  email: string;
  createdAt: string;
};

export type WorkshopInput = Omit<Workshop, 'createdAt' | 'photos' | 'onVacation' | 'vacationNote'>;
