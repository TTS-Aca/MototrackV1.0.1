import { useRouter } from 'expo-router';
import { Wrench } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Alert, Linking, Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { MultiOptionChips } from '@/components/mototrack/multi-option-chips';
import { OptionChips } from '@/components/mototrack/option-chips';
import { RecordField } from '@/components/mototrack/record-field';
import { RecordScreenShell } from '@/components/mototrack/record-screen-shell';
import { WorkshopMapPicker } from '@/components/mototrack/workshop-map-picker';
import type { MotoTrackTheme } from '@/constants/mototrack-theme';
import {
  DEFAULT_MAP_CENTER,
  OFFICIAL_BRANDS,
  WORKSHOP_BRANDS,
  defaultSchedule,
  isValidRfc,
  normalizeRfc,
} from '@/constants/workshop';
import { useAuth } from '@/contexts/auth-context';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';
import { useWorkshop } from '@/contexts/workshop-context';
import type { DaySchedule, WorkshopBrand } from '@/types/workshop';

export function WorkshopRegisterScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const { saveWorkshop } = useWorkshop();
  const { theme } = useMotoTrackTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [saving, setSaving] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rfc, setRfc] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(DEFAULT_MAP_CENTER.latitude);
  const [longitude, setLongitude] = useState(DEFAULT_MAP_CENTER.longitude);
  const [brands, setBrands] = useState<WorkshopBrand[]>([]);
  const [schedule, setSchedule] = useState<DaySchedule[]>(defaultSchedule);
  const [offersTowService, setOffersTowService] = useState(false);

  const handleRfcChange = (value: string) => {
    setRfc(normalizeRfc(value));
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value.replace(/\D/g, '').slice(0, 10));
  };

  const updateDay = (index: number, patch: Partial<DaySchedule>) => {
    setSchedule((current) =>
      current.map((entry, i) => (i === index ? { ...entry, ...patch } : entry)),
    );
  };

  const openWhatsAppPreview = () => {
    if (phone.length < 10) {
      Alert.alert('Teléfono incompleto', 'Ingresa un número de 10 dígitos para probar WhatsApp.');
      return;
    }
    Linking.openURL(`https://wa.me/52${phone}`);
  };

  const handleSave = async () => {
    if (!email.trim() || password.length < 6 || !name.trim() || !isValidRfc(rfc) || phone.length < 10 || !address.trim() || brands.length === 0) {
      Alert.alert('Faltan datos', 'Por favor, llena todos los campos correctamente.');
      return;
    }

    setSaving(true);
    try {
      const API_URL = 'http://192.168.1.4:8000/api/usuarios/taller/register/';
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          nombre_comercial: name.trim(),
          rfc,
          telefono_contacto: phone,
          direccion: address.trim(),
          latitud: latitude,
          longitud: longitude,
          marcas: brands,
          horarios: schedule,
          ofrece_remolque: offersTowService,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('¡Taller Registrado!', 'Tu negocio ya está en MotoTrack.');
        
        // Guardar en el contexto local para que el Frontend sepa que existe y no nos pida registrar de nuevo
        saveWorkshop({
          email: email.trim(),
          name: name.trim(),
          rfc,
          phone,
          address: address.trim(),
          latitude,
          longitude,
          brands,
          schedule,
          offersTowService,
        });

        await signIn(email.trim(), 'workshop');
        router.replace('/');
      } else {
        const errorMsg = data.email ? `Email: ${data.email[0]}` : 
                         data.rfc ? `RFC: ${data.rfc[0]}` : 'Verifica tus datos.';
        Alert.alert('Error al registrar taller', errorMsg);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error de conexión', 'No se pudo contactar con el servidor Django. Verifica que esté corriendo.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <RecordScreenShell
      title="Registra tu taller"
      subtitle="Publica tu negocio para que motociclistas te encuentren cerca."
      icon={Wrench}
      onSave={handleSave}
      saving={saving}
      saveLabel="REGISTRAR TALLER"
      hideMotoBadge>
      <Text style={styles.sectionTitle}>CUENTA DE ACCESO</Text>
      <RecordField
        label="CORREO DEL TALLER"
        value={email}
        onChangeText={setEmail}
        placeholder="taller@correo.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <RecordField
        label="CONTRASEÑA"
        value={password}
        onChangeText={setPassword}
        placeholder="Mínimo 6 caracteres"
        secureTextEntry
        autoCapitalize="none"
      />

      <Text style={styles.sectionTitle}>DATOS BÁSICOS</Text>
      <RecordField
        label="NOMBRE DEL TALLER"
        value={name}
        onChangeText={setName}
        placeholder="Ej. Quintana Motor's"
      />
      <RecordField
        label="RFC"
        value={rfc}
        onChangeText={handleRfcChange}
        placeholder="Ej. ABC123456XY1"
        autoCapitalize="characters"
      />
      <RecordField
        label="TELÉFONO DE CONTACTO"
        value={phone}
        onChangeText={handlePhoneChange}
        placeholder="10 dígitos"
        keyboardType="phone-pad"
        hint="Los clientes podrán contactarte por WhatsApp."
      />
      <Pressable
        style={({ pressed }) => [styles.whatsappBtn, pressed && styles.pressed]}
        onPress={openWhatsAppPreview}>
        <Text style={styles.whatsappBtnText}>PROBAR ENLACE WHATSAPP</Text>
      </Pressable>
      <RecordField
        label="DIRECCIÓN EXACTA"
        value={address}
        onChangeText={setAddress}
        placeholder="Calle, número, colonia, ciudad"
      />

      <WorkshopMapPicker
        latitude={latitude}
        longitude={longitude}
        onChange={({ latitude: lat, longitude: lng }) => {
          setLatitude(lat);
          setLongitude(lng);
        }}
      />

      <MultiOptionChips
        label="MARCAS CON LAS QUE TRABAJAS"
        options={WORKSHOP_BRANDS}
        values={brands}
        onChange={setBrands}
        exclusive="Multimarca"
      />
      {!brands.includes('Multimarca') && brands.length > 0 ? (
        <Text style={styles.brandHint}>
          Oficial: {brands.filter((b) => OFFICIAL_BRANDS.includes(b)).join(', ')}
        </Text>
      ) : null}

      <Text style={styles.sectionTitle}>HORARIOS DE ATENCIÓN</Text>
      {schedule.map((entry, index) => (
        <View key={entry.day} style={styles.dayRow}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayLabel}>{entry.day.toUpperCase()}</Text>
            <View style={styles.closedToggle}>
              <Text style={styles.closedLabel}>Cerrado</Text>
              <Switch
                value={entry.closed}
                onValueChange={(closed) => updateDay(index, { closed })}
                trackColor={{ false: theme.border, true: theme.orange500 }}
                thumbColor={theme.white}
              />
            </View>
          </View>
          {!entry.closed ? (
            <View style={styles.hoursRow}>
              <RecordField
                label="APERTURA"
                value={entry.open}
                onChangeText={(open) => updateDay(index, { open })}
                placeholder="09:00"
                style={styles.hourInput}
              />
              <RecordField
                label="CIERRE"
                value={entry.close}
                onChangeText={(close) => updateDay(index, { close })}
                placeholder="18:00"
                style={styles.hourInput}
              />
            </View>
          ) : null}
        </View>
      ))}

      <OptionChips
        label="¿OFRECE AUXILIO / REMOLQUE MECÁNICO?"
        options={['Sí', 'No'] as const}
        value={offersTowService ? 'Sí' : 'No'}
        onChange={(value) => setOffersTowService(value === 'Sí')}
      />
    </RecordScreenShell>
  );
}

function createStyles(theme: MotoTrackTheme) {
  return StyleSheet.create({
    sectionTitle: {
      fontSize: 10,
      fontFamily: 'monospace',
      letterSpacing: 1.5,
      color: theme.orange400,
      marginTop: 4,
    },
    whatsappBtn: {
      borderWidth: 1,
      borderColor: '#25D366',
      borderRadius: 12,
      paddingVertical: 10,
      alignItems: 'center',
      backgroundColor: 'rgba(37, 211, 102, 0.08)',
    },
    whatsappBtnText: {
      fontSize: 10,
      fontFamily: 'monospace',
      letterSpacing: 1,
      color: '#25D366',
      fontWeight: '700',
    },
    brandHint: {
      fontSize: 11,
      color: theme.textTertiary,
    },
    dayRow: {
      gap: 8,
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
    },
    dayHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dayLabel: {
      fontSize: 10,
      fontFamily: 'monospace',
      letterSpacing: 1,
      color: theme.textSecondary,
    },
    closedToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    closedLabel: {
      fontSize: 11,
      color: theme.textMuted,
    },
    hoursRow: {
      flexDirection: 'row',
      gap: 10,
    },
    hourInput: {
      flex: 1,
    },
    pressed: {
      opacity: 0.85,
      transform: [{ scale: 0.98 }],
    },
  });
}
