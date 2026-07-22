import { useRouter, type Href } from 'expo-router';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/contexts/auth-context';
import { useWorkshop } from '@/contexts/workshop-context';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';
import type { MotoTrackTheme } from '@/constants/mototrack-theme';

export function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signIn } = useAuth();
  const { saveWorkshop } = useWorkshop();
  const { theme } = useMotoTrackTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [email, setEmail] = useState('kevin@mototrack.mx');
  const [password, setPassword] = useState('demo1234');
  const [hidden, setHidden] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tu correo y contraseña.');
      return;
    }

    setSubmitting(true);
    try {
      const API_URL = 'http://192.168.1.4:8000/api/usuarios/login/';
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      });

      const data = await response.json();

      if (response.ok && data.access) {
        // Guardamos el token (en app real iría a SecureStore)
        const accountType = (data.rol === 'MECANICO' || data.is_workshop) ? 'workshop' : 'rider';
        
        if (data.is_workshop && data.taller_data) {
          saveWorkshop({
            email: email.trim().toLowerCase(),
            ...data.taller_data
          });
        }

        await signIn(email, accountType);
        router.replace('/');
      } else {
        Alert.alert('Credenciales inválidas', 'El correo o la contraseña son incorrectos.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error de conexión', 'No se pudo contactar con el servidor. Verifica que Django esté encendido en la IP 192.168.1.4.');
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
        <View style={styles.header}>
          <Text style={styles.brand}>MOTOTRACK</Text>
          <View style={styles.demoBadge}>
            <Text style={styles.demoBadgeText}>MOCKUP · DEMO</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.title}>Bienvenido de vuelta.</Text>
          <Text style={styles.subtitle}>Ingresa a tu panel MotoTrack.</Text>
        </View>

        <View style={styles.form}>
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
                style={styles.input}
              />
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
                secureTextEntry={hidden}
                autoCapitalize="none"
                style={[styles.input, styles.inputWithToggle]}
              />
              <Pressable onPress={() => setHidden((v) => !v)} style={styles.toggleBtn}>
                {hidden ? (
                  <Eye size={16} color={theme.textMuted} />
                ) : (
                  <EyeOff size={16} color={theme.textMuted} />
                )}
              </Pressable>
            </View>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
          onPress={handleSignIn}
          disabled={submitting}>
          {submitting ? (
            <ActivityIndicator color={theme.white} />
          ) : (
            <Text style={styles.primaryBtnText}>ENTRAR A MI CUENTA</Text>
          )}
        </Pressable>

        <Text style={styles.mockHint}>
          
        </Text>

        <View style={styles.workshopCard}>
          <Text style={styles.workshopTitle}>¿Tienes un taller?</Text>
          <Text style={styles.workshopCopy}>
            Registra tu negocio para que motociclistas te encuentren cerca.
          </Text>
          <Pressable onPress={() => router.push('/taller-register' as Href)}>
            <Text style={styles.switchLink}>¿Eres taller? Regístrate aquí</Text>
          </Pressable>
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>¿Aún no tienes cuenta? </Text>
          <Pressable onPress={() => router.push('/register')}>
            <Text style={styles.switchLink}>Crear cuenta</Text>
          </Pressable>
        </View>
      </ScrollView>
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
      gap: 24,
    },
    header: {
      alignItems: 'center',
      gap: 10,
    },
    brand: {
      fontSize: 16,
      fontFamily: 'monospace',
      letterSpacing: 2,
      color: theme.textTertiary,
    },
    demoBadge: {
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
    },
    demoBadgeText: {
      fontSize: 8,
      fontFamily: 'monospace',
      letterSpacing: 1.2,
      color: theme.orange400,
    },
    hero: {
      gap: 6,
      paddingTop: 8,
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
      gap: 16,
    },
    field: {
      gap: 8,
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
      paddingLeft: 42,
      paddingRight: 14,
      fontSize: 14,
      color: theme.text,
    },
    inputWithToggle: {
      paddingRight: 42,
    },
    toggleBtn: {
      position: 'absolute',
      right: 12,
      padding: 4,
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
    mockHint: {
      fontSize: 11,
      lineHeight: 16,
      color: theme.textMuted,
      textAlign: 'center',
    },
    workshopCard: {
      gap: 8,
      padding: 16,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
    },
    workshopTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.text,
    },
    workshopCopy: {
      fontSize: 12,
      color: theme.textSecondary,
      lineHeight: 17,
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
  });
}
