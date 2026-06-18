import { Fuel } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { RecordField } from '@/components/mototrack/record-field';
import { RecordScreenShell } from '@/components/mototrack/record-screen-shell';

export function GasolinaRecordScreen() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [amount, setAmount] = useState('350');
  const [liters, setLiters] = useState('12.5');
  const [odometer, setOdometer] = useState('18420');
  const [station, setStation] = useState('Pemex · Av. Insurgentes');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      Alert.alert(
        'Carga registrada',
        `Gasolina · $${amount} · ${liters} L · ${odometer} km`,
        [{ text: 'OK', onPress: () => router.back() }],
      );
    }, 400);
  };

  return (
    <RecordScreenShell
      title="Registro de gasolina"
      subtitle="Captura cada carga para medir consumo y gasto mensual."
      icon={Fuel}
      onSave={handleSave}
      saving={saving}>
      <RecordField
        label="MONTO ($ MXN)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
        placeholder="350"
      />
      <RecordField
        label="LITROS"
        value={liters}
        onChangeText={setLiters}
        keyboardType="decimal-pad"
        placeholder="12.5"
        hint={`≈ $${liters && amount ? (Number(amount) / Number(liters)).toFixed(2) : '—'} / litro`}
      />
      <RecordField
        label="ODÓMETRO (KM)"
        value={odometer}
        onChangeText={setOdometer}
        keyboardType="number-pad"
        placeholder="18420"
      />
      <RecordField
        label="ESTACIÓN"
        value={station}
        onChangeText={setStation}
        placeholder="Nombre o ubicación"
      />
      <RecordField
        label="NOTAS (OPCIONAL)"
        value={notes}
        onChangeText={setNotes}
        placeholder="Magna, pago con tarjeta..."
        multiline
        style={{ minHeight: 72, textAlignVertical: 'top' }}
      />
    </RecordScreenShell>
  );
}
