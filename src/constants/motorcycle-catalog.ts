export const FUEL_TYPES = ['Magna', 'Premium'] as const;

export type MotorcycleCatalogModel = {
  id: string;
  name: string;
  cc?: number;
  tankL?: number;
  yearFrom?: number;
  yearTo?: number;
};

export type MotorcycleCatalogBrand = {
  id: string;
  name: string;
  models: MotorcycleCatalogModel[];
};

function toModelId(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function models(names: readonly string[]): MotorcycleCatalogModel[] {
  return names.map((name) => ({ id: toModelId(name), name }));
}

export const MOTORCYCLE_CATALOG: MotorcycleCatalogBrand[] = [
  {
    id: 'italika',
    name: 'Italika',
    models: models([
      'FT150',
      'FT125',
      'FT180',
      'DT150',
      'DT125',
      'DM200',
      'DM250',
      'RC150',
      'RC200',
      'AT110',
      'WS150',
      'WS175',
      'TC250',
      'Vort-X 200',
      'Vort-X 300',
    ]),
  },
  {
    id: 'honda',
    name: 'Honda',
    models: models([
      'Cargo 150',
      'Wave 110',
      'CGL 125 Tool',
      'CB125F',
      'CB160F',
      'CB190R',
      'XR150L',
      'XR190L',
      'Navi',
      'Dio 110',
      'Elite 125',
      'PCX160',
      'CB300F',
      'CB500F',
      'CRF300L',
    ]),
  },
  {
    id: 'yamaha',
    name: 'Yamaha',
    models: models([
      'YBR125',
      'SZ-RR 150',
      'FZ-S FI',
      'FZ25',
      'MT-03',
      'MT-07',
      'MT-09',
      'R15',
      'R3',
      'R7',
      'XTZ125',
      'XTZ150',
      'Ray ZR',
      'NMAX 155',
      'Aerox 155',
    ]),
  },
  {
    id: 'suzuki',
    name: 'Suzuki',
    models: models([
      'AX4',
      'EN125',
      'Gixxer 150',
      'Gixxer SF',
      'Gixxer 250',
      'GSX-250R',
      'GSX-S750',
      'V-Strom 250',
      'V-Strom 650',
      'Burgman Street 125',
      'Burgman 400',
      'Hayabusa',
      'GSX-R600',
      'GSX-R1000',
      'DR650',
    ]),
  },
  {
    id: 'kawasaki',
    name: 'Kawasaki',
    models: models([
      'Ninja 400',
      'Ninja 500',
      'Ninja 650',
      'Ninja ZX-4R',
      'Ninja ZX-6R',
      'Ninja ZX-10R',
      'Z400',
      'Z500',
      'Z650',
      'Z900',
      'Versys 300',
      'Versys 650',
      'KLR650',
      'Vulcan S',
      'Eliminator 500',
    ]),
  },
  {
    id: 'vento',
    name: 'Vento',
    models: models([
      'Rocketman 250',
      'Tornado 250',
      'Nitrox 200',
      'Crossmax 250',
      'Workman 150',
      'Ryder 150',
      'Lithium 2.0',
      'Colt 220',
      'Storm 250',
      'Rebellian 200',
      'Gladiator 200',
      'Terra 150',
      'Spectra 150',
      'Xpress 150',
      'Phantom 250',
    ]),
  },
  {
    id: 'bajaj',
    name: 'Bajaj',
    models: models([
      'Boxer BM150',
      'Boxer BM150X',
      'Pulsar 125',
      'Pulsar NS125',
      'Pulsar NS160',
      'Pulsar NS200',
      'Pulsar N250',
      'Pulsar RS200',
      'Dominar 250',
      'Dominar 400',
      'Avenger Cruise 220',
      'Platina 100',
      'Discover 125',
      'Pulsar AS200',
      'CT100',
    ]),
  },
  {
    id: 'tvs',
    name: 'TVS',
    models: models([
      'Apache RTR 160',
      'Apache RTR 200',
      'Apache RR310',
      'Raider 125',
      'Sport 100',
      'Star City Plus',
      'Ntorq 125',
      'Jupiter 110',
      'Radeon 110',
      'Ronin 225',
      'Apache RTR 180',
      'XL100',
      'Apache RTR 310',
      'Zeppelin (mercados seleccionados)',
      'iQube (eléctrica)',
    ]),
  },
  {
    id: 'bmw-motorrad',
    name: 'BMW Motorrad',
    models: models([
      'G310R',
      'G310GS',
      'F750GS',
      'F850GS',
      'F900R',
      'F900GS',
      'S1000RR',
      'S1000R',
      'R1250GS',
      'R1300GS',
      'R18',
      'R12',
      'K1600GT',
      'CE04',
      'M1000RR',
    ]),
  },
  {
    id: 'harley-davidson',
    name: 'Harley-Davidson',
    models: models([
      'Iron 883',
      'Sportster S',
      'Nightster',
      'Street Bob',
      'Fat Bob',
      'Fat Boy',
      'Heritage Classic',
      'Breakout',
      'Road King',
      'Road Glide',
      'Street Glide',
      'Low Rider S',
      'Low Rider ST',
      'Pan America 1250',
      'CVO Road Glide',
    ]),
  },
];

export function getCatalogBrands(): MotorcycleCatalogBrand[] {
  return MOTORCYCLE_CATALOG;
}

export function getBrandNames(): string[] {
  return MOTORCYCLE_CATALOG.map((b) => b.name);
}

export function findBrandByName(name: string): MotorcycleCatalogBrand | undefined {
  return MOTORCYCLE_CATALOG.find((b) => b.name === name);
}

export function getModelsForBrand(brandName: string): MotorcycleCatalogModel[] {
  return findBrandByName(brandName)?.models ?? [];
}

export function findModel(brandName: string, modelName: string): MotorcycleCatalogModel | undefined {
  return getModelsForBrand(brandName).find((m) => m.name === modelName);
}

export function getYearHint(brandName: string, modelName: string): string | undefined {
  const model = findModel(brandName, modelName);
  if (!model?.yearFrom) return undefined;
  if (model.yearTo) {
    return `Años válidos: ${model.yearFrom}–${model.yearTo}`;
  }
  return `Desde ${model.yearFrom}`;
}

export function isYearValidForModel(brandName: string, modelName: string, year: string): boolean {
  const model = findModel(brandName, modelName);
  if (!model?.yearFrom || year.length !== 4) return true;
  const y = Number(year);
  const from = model.yearFrom;
  const to = model.yearTo ?? new Date().getFullYear();
  return y >= from && y <= to;
}
