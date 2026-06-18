import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AuthField } from '@/components/mototrack/auth/auth-field.web';
import {
  AuthBadge,
  AuthDivider,
  AuthLegalText,
  AuthShell,
} from '@/components/mototrack/auth/auth-shell.web';
import { GoogleButton } from '@/components/mototrack/auth/google-button.web';
import { AuthColors } from '@/constants/auth-theme';
import { Fonts } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';

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
  const { signIn } = useAuth();
  const [countryCode, setCountryCode] = useState('+52');
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  const handleRegister = async () => {
    await signIn('demo@mototrack.mx');
    router.replace('/');
  };

  return (
    <AuthShell backHref="/login">
      <AuthBadge />

      <View style={styles.headingBlock}>
        <Text style={styles.title}>Crea tu cuenta.</Text>
        <Text style={styles.subtitle}>Empieza a gestionar tus motos hoy.</Text>
      </View>

      <View style={styles.form}>
        <AuthField
          label="NOMBRES"
          placeholder="Ej. Kevin Eduardo"
          autoComplete="name-given"
        />
        <View style={styles.rowTwo}>
          <View style={styles.fieldHalf}>
            <AuthField
              label="APELLIDO PATERNO"
              placeholder="Pérez"
              autoComplete="name-family"
            />
          </View>
          <View style={styles.fieldHalf}>
            <AuthField
              label="APELLIDO MATERNO"
              placeholder="García"
              autoComplete="name-family"
            />
          </View>
        </View>
        <AuthField
          label="AÑO DE NACIMIENTO"
          placeholder="1995"
          keyboardType="number-pad"
          maxLength={4}
        />
        <AuthField
          label="CORREO ELECTRÓNICO"
          icon="mail"
          placeholder="tu@correo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <View style={styles.phoneField}>
          <Text style={styles.phoneLabel}>NÚMERO DE TELÉFONO</Text>
          <View style={styles.phoneRow}>
            <Pressable
              style={styles.countryCodeBtn}
              onPress={() => setCountryPickerVisible(true)}>
              <Text style={styles.countryCodeText}>{countryCode}</Text>
            </Pressable>
            <TextInput
              placeholder="55 1234 5678"
              placeholderTextColor={AuthColors.textFaint}
              keyboardType="phone-pad"
              autoComplete="tel"
              style={styles.phoneInput}
            />
          </View>
        </View>
        <AuthField
          label="CONTRASEÑA"
          icon="lock"
          placeholder="••••••••"
          secureToggle
        />
        <AuthField
          label="CONFIRMAR CONTRASEÑA"
          icon="lock"
          placeholder="••••••••"
          secureToggle
        />
      </View>

      <Pressable
        style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
        onPress={handleRegister}>
        <Text style={styles.primaryBtnText}>CREAR CUENTA</Text>
      </Pressable>

      <AuthDivider />
      <GoogleButton />

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>¿Ya tienes cuenta? </Text>
        <Pressable onPress={() => router.push('/login')}>
          <Text style={styles.switchLink}>Iniciar sesión</Text>
        </Pressable>
      </View>

      <AuthLegalText />

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
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  headingBlock: {
    gap: 8,
  },
  title: {
    fontFamily: Fonts.serif,
    fontSize: 36,
    lineHeight: 40,
    color: AuthColors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: AuthColors.textMuted,
  },
  form: {
    gap: 16,
  },
  rowTwo: {
    flexDirection: 'row',
    gap: 12,
  },
  fieldHalf: {
    flex: 1,
  },
  phoneField: {
    gap: 8,
  },
  phoneLabel: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    letterSpacing: 1.2,
    color: AuthColors.textMuted,
  },
  phoneRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  countryCodeBtn: {
    backgroundColor: AuthColors.surface,
    borderWidth: 1,
    borderColor: AuthColors.border,
    paddingVertical: 13,
    paddingHorizontal: 14,
    minWidth: 72,
    alignItems: 'center',
  },
  countryCodeText: {
    fontFamily: Fonts.mono,
    fontSize: 14,
    color: AuthColors.text,
    fontWeight: '600',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: AuthColors.surface,
    borderWidth: 1,
    borderColor: AuthColors.border,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    color: AuthColors.text,
  },
  primaryBtn: {
    backgroundColor: AuthColors.text,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryBtnText: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    letterSpacing: 2,
    color: AuthColors.surface,
  },
  pressed: {
    opacity: 0.85,
  },
  switchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchText: {
    fontSize: 13,
    color: AuthColors.textMuted,
  },
  switchLink: {
    fontFamily: Fonts.mono,
    fontSize: 13,
    color: AuthColors.text,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: AuthColors.surface,
    borderWidth: 1,
    borderColor: AuthColors.border,
    padding: 16,
    gap: 4,
  },
  modalTitle: {
    fontFamily: Fonts.mono,
    fontSize: 13,
    letterSpacing: 1,
    color: AuthColors.textMuted,
    marginBottom: 8,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  modalOptionActive: {
    backgroundColor: AuthColors.background,
  },
  modalOptionCode: {
    fontFamily: Fonts.mono,
    fontSize: 14,
    fontWeight: '700',
    color: AuthColors.text,
    minWidth: 48,
  },
  modalOptionCountry: {
    fontSize: 14,
    color: AuthColors.text,
  },
});
