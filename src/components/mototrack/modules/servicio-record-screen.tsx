import { Wrench } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { OptionChips } from '@/components/mototrack/option-chips';
import { RecordField } from '@/components/mototrack/record-field';
import { RecordScreenShell } from '@/components/mototrack/record-screen-shell';

const serviceTypes = ['Aceite', 'Frenos', 'Llantas', 'General'] as const;

export function ServicioRecordScreen() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [serviceType, setServiceType] = useState<string>(serviceTypes[0]);
  const [workshop, setWorkshop] = useState("Quintana Motor's");
  const [cost, setCost] = useState('850');
  const [odometer, setOdometer] = useState('18420');
  const [nextKm, setNextKm] = useState('23420');
  const [notes, setNotes] = useState('Cambio de aceite sintético 10W-40');

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      Alert.alert(
        'Servicio registrado',
        `${serviceType} · $${cost} · Próximo a ${nextKm} km`,
        [{ text: 'OK', onPress: () => router.back() }],
      );
    }, 400);
  };

  return (
    <RecordScreenShell
      title="Registro de servicio"
      subtitle="Documenta mantenimientos y programa el próximo recordatorio."
      icon={Wrench}
      onSave={handleSave}
      saving={saving}>
      <OptionChips
        label="TIPO DE SERVICIO"
        options={serviceTypes}
        value={serviceType}
        onChange={setServiceType}
      />
      <RecordField
        label="TALLER"
        value={workshop}
        onChangeText={setWorkshop}
        placeholder="Nombre del taller"
      />
      <RecordField
        label="COSTO ($ MXN)"
        value={cost}
        onChangeText={setCost}
        keyboardType="decimal-pad"
        placeholder="850"
      />
      <RecordField
        label="ODÓMETRO AL SERVICIO (KM)"
        value={odometer}
        onChangeText={setOdometer}
        keyboardType="number-pad"
        placeholder="18420"
      />
      <RecordField
        label="PRÓXIMO SERVICIO (KM)"
        value={nextKm}
        onChangeText={setNextKm}
        keyboardType="number-pad"
        placeholder="23420"
        hint={`En ${Math.max(Number(nextKm) - Number(odometer), 0) || '—'} km`}
      />
      <RecordField
        label="DETALLE / NOTAS"
        value={notes}
        onChangeText={setNotes}
        placeholder="Qué se hizo en el servicio"
        multiline
        style={{ minHeight: 72, textAlignVertical: 'top' }}
      />
    </RecordScreenShell>
  );
}
