import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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

export function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    await signIn('demo@mototrack.mx');
    router.replace('/');
  };

  return (
    <AuthShell>
      <AuthBadge />

      <View style={styles.headingBlock}>
        <Text style={styles.title}>Bienvenido de vuelta.</Text>
        <Text style={styles.subtitle}>Ingresa a tu panel MotoTrack.</Text>
      </View>

      <View style={styles.form}>
        <AuthField
          label="CORREO ELECTRÓNICO"
          icon="mail"
          placeholder="tu@correo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <AuthField
          label="CONTRASEÑA"
          icon="lock"
          placeholder="••••••••"
          secureToggle
          rightLabel="¿Olvidaste la contraseña?"
        />
      </View>

      <Pressable
        style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
        onPress={handleSignIn}>
        <Text style={styles.primaryBtnText}>ENTRAR A MI CUENTA</Text>
      </Pressable>

      <AuthDivider />
      <GoogleButton />

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>¿Aún no tienes cuenta? </Text>
        <Pressable onPress={() => router.push('/register')}>
          <Text style={styles.switchLink}>Crear cuenta</Text>
        </Pressable>
      </View>

      <AuthLegalText />
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
});
