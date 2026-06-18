import { ArrowLeft, type LucideIcon } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useMemo, type ReactNode } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { MotoTrackTheme } from '@/constants/mototrack-theme';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';
import { useMotorcycle } from '@/contexts/motorcycle-context';
import { motorcycleDisplayName } from '@/types/motorcycle';

type RecordScreenShellProps = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accentColor?: string;
  children: ReactNode;
  onSave: () => void;
  saving?: boolean;
  saveLabel?: string;
  hideMotoBadge?: boolean;
};

export function RecordScreenShell({
  title,
  subtitle,
  icon: Icon,
  accentColor,
  children,
  onSave,
  saving = false,
  saveLabel = 'GUARDAR REGISTRO',
  hideMotoBadge = false,
}: RecordScreenShellProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useMotoTrackTheme();
  const { motorcycle } = useMotorcycle();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const iconColor = accentColor ?? theme.orange400;
  const motoBadgeLabel = motorcycle ? motorcycleDisplayName(motorcycle) : null;

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={18} color={theme.textSecondary} />
          <Text style={styles.backText}>Volver</Text>
        </Pressable>
        {!hideMotoBadge && motoBadgeLabel ? (
          <View style={styles.motoBadge}>
            <Text style={styles.motoBadgeText}>{motoBadgeLabel}</Text>
          </View>
        ) : null}
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: Math.max(insets.bottom, 16) + 80 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={[styles.iconWrap, { borderColor: iconColor }]}>
            <Icon size={22} color={iconColor} />
          </View>
          <View style={styles.heroCopy}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>

        <View style={styles.form}>{children}</View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <Pressable
          style={({ pressed }) => [styles.saveBtn, pressed && styles.pressed]}
          onPress={onSave}
          disabled={saving}>
          {saving ? (
            <ActivityIndicator color={theme.white} />
          ) : (
            <Text style={styles.saveBtnText}>{saveLabel}</Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

function createStyles(theme: MotoTrackTheme) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingBottom: 8,
    },
    backBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    backText: {
      fontSize: 13,
      color: theme.textSecondary,
    },
    motoBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
    },
    motoBadgeText: {
      fontSize: 9,
      fontFamily: 'monospace',
      letterSpacing: 1.2,
      color: theme.textSecondary,
    },
    scroll: {
      paddingHorizontal: 16,
      gap: 20,
    },
    hero: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      paddingTop: 8,
    },
    iconWrap: {
      width: 48,
      height: 48,
      borderRadius: 14,
      borderWidth: 1,
      backgroundColor: theme.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    heroCopy: {
      flex: 1,
      gap: 4,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.text,
    },
    subtitle: {
      fontSize: 13,
      color: theme.textSecondary,
      lineHeight: 18,
    },
    form: {
      gap: 16,
    },
    footer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 16,
      paddingTop: 12,
      backgroundColor: theme.background,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    saveBtn: {
      backgroundColor: theme.orange500,
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 48,
    },
    saveBtnText: {
      fontSize: 11,
      fontFamily: 'monospace',
      letterSpacing: 2,
      fontWeight: '700',
      color: theme.white,
    },
    pressed: {
      opacity: 0.85,
      transform: [{ scale: 0.98 }],
    },
  });
}
