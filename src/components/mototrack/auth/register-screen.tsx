import { useRouter } from 'expo-router';
import { Lock, Mail, Phone } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { MotoTrackTheme } from '@/constants/mototrack-theme';
import { useAuth } from '@/contexts/auth-context';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';

const COUNTRY_CODES = [
  { code: '+52', country: 'México' },
  { code: '+1', country: 'Estados Unidos' },
  { code: '+34', country: 'España' },
  { code: '+57', country: 'Colombia' },
  { code: '+54', country: 'Argentina' },
  { code: '+56', country: 'Chile' },
  { code: '+51', country: 'Perú' },
  { code: '+55', country: 'Brasil' },
];

export function RegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signIn } = useAuth();
  const { theme } = useMotoTrackTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [nombres, setNombres] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+52');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  const handleBirthYearChange = (value: string) => {
    setBirthYear(value.replace(/\D/g, '').slice(0, 4));
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value.replace(/\D/g, '').slice(0, 10));
  };

  const handleRegister = async () => {
    setSubmitting(true);
    try {
      const fallbackEmail = nombres
        ? `${nombres.toLowerCase().replace(/\s+/g, '.')}@mototrack.mx`
        : 'demo@mototrack.mx';
      await signIn(email || fallbackEmail);
      router.replace('/');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 16, paddingBottom: Math.max(insets.bottom, 24) },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Volver</Text>
        </Pressable>

        <View style={styles.hero}>
          <Text style={styles.title}>Crea tu cuenta.</Text>
          <Text style={styles.subtitle}>Empieza a gestionar tus motos hoy.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>NOMBRES</Text>
            <TextInput
              value={nombres}
              onChangeText={setNombres}
              placeholder="Ej. Kevin Eduardo"
              placeholderTextColor={theme.textMuted}
              autoComplete="name-given"
              style={styles.input}
            />
          </View>

          <View style={styles.rowTwo}>
            <View style={[styles.field, styles.fieldHalf]}>
              <Text style={styles.label}>APELLIDO PATERNO</Text>
              <TextInput
                value={apellidoPaterno}
                onChangeText={setApellidoPaterno}
                placeholder="Pérez"
                placeholderTextColor={theme.textMuted}
                autoComplete="name-family"
                style={styles.input}
              />
            </View>
            <View style={[styles.field, styles.fieldHalf]}>
              <Text style={styles.label}>APELLIDO MATERNO</Text>
              <TextInput
                value={apellidoMaterno}
                onChangeText={setApellidoMaterno}
                placeholder="García"
                placeholderTextColor={theme.textMuted}
                autoComplete="name-family"
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>AÑO DE NACIMIENTO</Text>
            <TextInput
              value={birthYear}
              onChangeText={handleBirthYearChange}
              placeholder="1995"
              placeholderTextColor={theme.textMuted}
              keyboardType="number-pad"
              maxLength={4}
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
            <View style={styles.inputWrap}>
              <Mail size={16} color={theme.textMuted} style={styles.inputIcon} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="tu@correo.com"
                placeholderTextColor={theme.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                style={[styles.input, styles.inputWithIcon]}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>NÚMERO DE TELÉFONO</Text>
            <View style={styles.phoneRow}>
              <Pressable
                style={styles.countryCodeBtn}
                onPress={() => setCountryPickerVisible(true)}>
                <Text style={styles.countryCodeText}>{countryCode}</Text>
              </Pressable>
              <View style={[styles.inputWrap, styles.phoneInputWrap]}>
                <Phone size={16} color={theme.textMuted} style={styles.inputIcon} />
                <TextInput
                  value={phone}
                  onChangeText={handlePhoneChange}
                  placeholder="55 1234 5678"
                  placeholderTextColor={theme.textMuted}
                  keyboardType="phone-pad"
                  autoComplete="tel"
                  style={[styles.input, styles.inputWithIcon, styles.phoneInput]}
                />
              </View>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>CONTRASEÑA</Text>
            <View style={styles.inputWrap}>
              <Lock size={16} color={theme.textMuted} style={styles.inputIcon} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor={theme.textMuted}
                secureTextEntry
                autoCapitalize="none"
                style={[styles.input, styles.inputWithIcon]}
              />
            </View>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
          onPress={handleRegister}
          disabled={submitting}>
          {submitting ? (
            <ActivityIndicator color={theme.white} />
          ) : (
            <Text style={styles.primaryBtnText}>CREAR CUENTA</Text>
          )}
        </Pressable>

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>¿Ya tienes cuenta? </Text>
          <Pressable onPress={() => router.replace('/login')}>
            <Text style={styles.switchLink}>Iniciar sesión</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal
        visible={countryPickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCountryPickerVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setCountryPickerVisible(false)}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Código de país</Text>
            {COUNTRY_CODES.map((item) => (
              <Pressable
                key={item.code}
                style={({ pressed }) => [
                  styles.modalOption,
                  item.code === countryCode && styles.modalOptionActive,
                  pressed && styles.pressed,
                ]}
                onPress={() => {
                  setCountryCode(item.code);
                  setCountryPickerVisible(false);
                }}>
                <Text style={styles.modalOptionCode}>{item.code}</Text>
                <Text style={styles.modalOptionCountry}>{item.country}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

function createStyles(theme: MotoTrackTheme) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scroll: {
      flexGrow: 1,
      paddingHorizontal: 20,
      gap: 20,
    },
    backBtn: {
      alignSelf: 'flex-start',
    },
    backText: {
      fontSize: 11,
      fontFamily: 'monospace',
      letterSpacing: 1,
      color: theme.textMuted,
    },
    hero: {
      gap: 6,
    },
    title: {
      fontSize: 26,
      fontWeight: '700',
      color: theme.text,
      lineHeight: 30,
    },
    subtitle: {
      fontSize: 14,
      color: theme.textSecondary,
    },
    form: {
      gap: 14,
    },
    field: {
      gap: 8,
    },
    rowTwo: {
      flexDirection: 'row',
      gap: 10,
    },
    fieldHalf: {
      flex: 1,
    },
    label: {
      fontSize: 9,
      fontFamily: 'monospace',
      letterSpacing: 1.2,
      color: theme.textMuted,
    },
    inputWrap: {
      position: 'relative',
      justifyContent: 'center',
    },
    inputIcon: {
      position: 'absolute',
      left: 14,
      zIndex: 1,
    },
    input: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      paddingVertical: 13,
      paddingHorizontal: 14,
      fontSize: 14,
      color: theme.text,
    },
    inputWithIcon: {
      paddingLeft: 42,
    },
    phoneRow: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
    countryCodeBtn: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      paddingVertical: 13,
      paddingHorizontal: 14,
      minWidth: 72,
      alignItems: 'center',
    },
    countryCodeText: {
      fontSize: 14,
      fontFamily: 'monospace',
      color: theme.text,
      fontWeight: '600',
    },
    phoneInputWrap: {
      flex: 1,
    },
    phoneInput: {
      flex: 1,
    },
    primaryBtn: {
      backgroundColor: theme.orange500,
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 48,
    },
    primaryBtnText: {
      fontSize: 11,
      fontFamily: 'monospace',
      letterSpacing: 2,
      fontWeight: '700',
      color: theme.white,
    },
    switchRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 'auto',
    },
    switchText: {
      fontSize: 13,
      color: theme.textSecondary,
    },
    switchLink: {
      fontSize: 13,
      fontFamily: 'monospace',
      color: theme.orange400,
      fontWeight: '600',
    },
    pressed: {
      opacity: 0.85,
      transform: [{ scale: 0.98 }],
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.55)',
      justifyContent: 'center',
      paddingHorizontal: 24,
    },
    modalCard: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.border,
      padding: 16,
      gap: 4,
    },
    modalTitle: {
      fontSize: 13,
      fontFamily: 'monospace',
      letterSpacing: 1,
      color: theme.textMuted,
      marginBottom: 8,
    },
    modalOption: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderRadius: 10,
    },
    modalOptionActive: {
      backgroundColor: theme.background,
    },
    modalOptionCode: {
      fontSize: 14,
      fontFamily: 'monospace',
      fontWeight: '700',
      color: theme.orange400,
      minWidth: 48,
    },
    modalOptionCountry: {
      fontSize: 14,
      color: theme.text,
    },
  });
}
