import { Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { RecordField } from '@/components/mototrack/record-field';
import { RecordScreenShell } from '@/components/mototrack/record-screen-shell';

export function RefaccionRecordScreen() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [part, setPart] = useState('Filtro de aceite');
  const [brand, setBrand] = useState('Honda OEM');
  const [cost, setCost] = useState('320');
  const [odometer, setOdometer] = useState('18420');
  const [supplier, setSupplier] = useState('Refaccionaria Centro');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      Alert.alert(
        'Refacción registrada',
        `${part} · ${brand} · $${cost}`,
        [{ text: 'OK', onPress: () => router.back() }],
      );
    }, 400);
  };

  return (
    <RecordScreenShell
      title="Registro de refacción"
      subtitle="Lleva el historial de piezas instaladas y su costo."
      icon={Settings}
      onSave={handleSave}
      saving={saving}>
      <RecordField
        label="PIEZA / REFACCIÓN"
        value={part}
        onChangeText={setPart}
        placeholder="Filtro de aceite, pastillas..."
      />
      <RecordField
        label="MARCA"
        value={brand}
        onChangeText={setBrand}
        placeholder="Honda OEM, Brembo..."
      />
      <RecordField
        label="COSTO ($ MXN)"
        value={cost}
        onChangeText={setCost}
        keyboardType="decimal-pad"
        placeholder="320"
      />
      <RecordField
        label="ODÓMETRO (KM)"
        value={odometer}
        onChangeText={setOdometer}
        keyboardType="number-pad"
        placeholder="18420"
      />
      <RecordField
        label="PROVEEDOR / TIENDA"
        value={supplier}
        onChangeText={setSupplier}
        placeholder="Dónde la compraste"
      />
      <RecordField
        label="NOTAS (OPCIONAL)"
        value={notes}
        onChangeText={setNotes}
        placeholder="Número de parte, garantía..."
        multiline
        style={{ minHeight: 72, textAlignVertical: 'top' }}
      />
    </RecordScreenShell>
  );
}
