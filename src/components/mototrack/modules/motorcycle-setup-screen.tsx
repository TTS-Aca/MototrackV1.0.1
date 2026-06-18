import { Bike } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import { MotorcycleModelPicker } from '@/components/mototrack/motorcycle-model-picker';
import { OptionChips } from '@/components/mototrack/option-chips';
import { RecordField } from '@/components/mototrack/record-field';
import { RecordScreenShell } from '@/components/mototrack/record-screen-shell';
import {
  FUEL_TYPES,
  getBrandNames,
  getModelsForBrand,
  getYearHint,
  isYearValidForModel,
} from '@/constants/motorcycle-catalog';
import { useMotorcycle } from '@/contexts/motorcycle-context';

export function MotorcycleSetupScreen() {
  const router = useRouter();
  const { saveMotorcycle } = useMotorcycle();
  const [saving, setSaving] = useState(false);

  const brandNames = useMemo(() => getBrandNames(), []);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [fuelType, setFuelType] = useState<string>(FUEL_TYPES[0]);
  const [lastOilChangeKm, setLastOilChangeKm] = useState('');
  const [plates, setPlates] = useState('');
  const [nickname, setNickname] = useState('');

  const modelOptions = useMemo(
    () => (brand ? getModelsForBrand(brand).map((m) => m.name) : []),
    [brand],
  );

  const yearHint = useMemo(() => {
    if (!brand || !model) return 'Año de fabricación o modelo';
    const catalogHint = getYearHint(brand, model);
    return catalogHint ?? 'Año de fabricación o modelo';
  }, [brand, model]);

  useEffect(() => {
    setModel('');
  }, [brand]);

  const handleYearChange = (value: string) => {
    setYear(value.replace(/\D/g, '').slice(0, 4));
  };

  const handleKmChange = (value: string, setter: (v: string) => void) => {
    setter(value.replace(/\D/g, '').slice(0, 7));
  };

  const handleSave = () => {
    if (!brand) {
      Alert.alert('Falta la marca', 'Selecciona la marca de tu moto.');
      return;
    }
    if (!model) {
      Alert.alert('Falta el modelo', 'Selecciona el modelo de tu moto.');
      return;
    }
    if (year.length !== 4) {
      Alert.alert('Año inválido', 'Ingresa el año de tu moto con 4 dígitos (ej. 2022).');
      return;
    }
    if (!isYearValidForModel(brand, model, year)) {
      Alert.alert('Año inválido', yearHint);
      return;
    }
    if (!mileage.trim()) {
      Alert.alert('Falta el kilometraje', 'Ingresa el kilometraje actual de tu moto.');
      return;
    }

    setSaving(true);
    saveMotorcycle({
      brand,
      model,
      year,
      mileage,
      fuelType,
      lastOilChangeKm: lastOilChangeKm.trim() || undefined,
      plates: plates.trim() || undefined,
      nickname: nickname.trim() || undefined,
    });
    router.replace('/');
    setSaving(false);
  };

  return (
    <RecordScreenShell
      title="Registra tu moto"
      subtitle="Primero elige la marca, luego el modelo de tu moto."
      icon={Bike}
      onSave={handleSave}
      saving={saving}
      saveLabel="GUARDAR MOTO"
      hideMotoBadge>
      <MotorcycleModelPicker
        label="MARCA"
        options={brandNames}
        value={brand}
        onChange={setBrand}
        placeholder="Seleccionar marca"
      />

      {brand ? (
        <MotorcycleModelPicker
          label="MODELO"
          options={modelOptions}
          value={model}
          onChange={setModel}
          placeholder="Seleccionar modelo"
        />
      ) : (
        <RecordField
          label="MODELO"
          value=""
          editable={false}
          placeholder="Primero selecciona una marca"
          hint="El catálogo de modelos aparece después de elegir la marca"
        />
      )}

      <RecordField
        label="AÑO DE LA MOTO"
        value={year}
        onChangeText={handleYearChange}
        keyboardType="number-pad"
        placeholder="2022"
        maxLength={4}
        hint={yearHint}
      />
      <RecordField
        label="KILOMETRAJE ACTUAL (KM)"
        value={mileage}
        onChangeText={(v) => handleKmChange(v, setMileage)}
        keyboardType="number-pad"
        placeholder="18420"
        hint="Lo que marca el odómetro hoy"
      />
      <OptionChips
        label="COMBUSTIBLE HABITUAL"
        options={FUEL_TYPES}
        value={fuelType}
        onChange={setFuelType}
      />
      <RecordField
        label="ÚLTIMO CAMBIO DE ACEITE (KM)"
        value={lastOilChangeKm}
        onChangeText={(v) => handleKmChange(v, setLastOilChangeKm)}
        keyboardType="number-pad"
        placeholder="Opcional · ej. 17200"
        hint="Nos ayuda a calcular el próximo mantenimiento"
      />
      <RecordField
        label="PLACAS (OPCIONAL)"
        value={plates}
        onChangeText={setPlates}
        placeholder="ABC-12-34"
        autoCapitalize="characters"
      />
      <RecordField
        label="NOMBRE PERSONALIZADO (OPCIONAL)"
        value={nickname}
        onChangeText={setNickname}
        placeholder="La Negra, Mi CB..."
        hint="Cómo le llamas a tu moto"
      />
    </RecordScreenShell>
  );
}
