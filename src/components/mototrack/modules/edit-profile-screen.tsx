import { UserPen } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { RecordField } from '@/components/mototrack/record-field';
import { RecordScreenShell } from '@/components/mototrack/record-screen-shell';
import { useUserProfile } from '@/contexts/user-profile-context';

export function EditProfileScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useUserProfile();
  const [saving, setSaving] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameMaternal, setLastNameMaternal] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+52');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (!profile) return;
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setLastNameMaternal(profile.lastNameMaternal ?? '');
    setBirthYear(profile.birthYear);
    setEmail(profile.email);
    setCountryCode(profile.countryCode);
    setPhone(profile.phone);
  }, [profile]);

  const handleBirthYearChange = (value: string) => {
    setBirthYear(value.replace(/\D/g, '').slice(0, 4));
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value.replace(/\D/g, '').slice(0, 10));
  };

  const handleSave = () => {
    if (!firstName.trim()) {
      Alert.alert('Falta el nombre', 'Ingresa tu nombre.');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Falta el correo', 'Ingresa tu correo electrónico.');
      return;
    }

    setSaving(true);
    updateProfile({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      lastNameMaternal: lastNameMaternal.trim() || undefined,
      birthYear,
      email: email.trim(),
      countryCode,
      phone,
    });
    Alert.alert('Perfil actualizado', 'Tus datos se guardaron correctamente.');
    router.back();
    setSaving(false);
  };

  if (!profile) {
    return null;
  }

  return (
    <RecordScreenShell
      title="Editar perfil"
      subtitle="Actualiza tu información personal."
      icon={UserPen}
      onSave={handleSave}
      saving={saving}
      saveLabel="GUARDAR PERFIL"
      hideMotoBadge>
      <RecordField
        label="NOMBRES"
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Ej. Kevin Eduardo"
        autoComplete="name-given"
      />
      <RecordField
        label="APELLIDO PATERNO"
        value={lastName}
        onChangeText={setLastName}
        placeholder="Ej. García"
        autoComplete="name-family"
      />
      <RecordField
        label="APELLIDO MATERNO"
        value={lastNameMaternal}
        onChangeText={setLastNameMaternal}
        placeholder="Opcional"
      />
      <RecordField
        label="AÑO DE NACIMIENTO"
        value={birthYear}
        onChangeText={handleBirthYearChange}
        placeholder="Ej. 1995"
        keyboardType="numeric"
      />
      <RecordField
        label="CORREO ELECTRÓNICO"
        value={email}
        onChangeText={setEmail}
        placeholder="tu@correo.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <RecordField
        label="CÓDIGO PAÍS"
        value={countryCode}
        onChangeText={setCountryCode}
        placeholder="+52"
      />
      <RecordField
        label="TELÉFONO"
        value={phone}
        onChangeText={handlePhoneChange}
        placeholder="10 dígitos"
        keyboardType="phone-pad"
      />
    </RecordScreenShell>
  );
}
