import { Activity, ArrowLeft, HelpCircle } from 'lucide-react-native';
import { useRouter, type Href } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AuthColors, AuthFooterTags } from '@/constants/auth-theme';
import { Fonts } from '@/constants/theme';

type AuthShellProps = {
  backHref?: string;
  children: ReactNode;
};

export function AuthShell({ backHref = '/', children }: AuthShellProps) {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={() => router.push(backHref as Href)}>
            <ArrowLeft size={14} color={AuthColors.textMuted} />
            <Text style={styles.backText}>Volver</Text>
          </Pressable>

          <View style={styles.logoWrap}>
            <View style={styles.logoIcon}>
              <Activity size={12} color={AuthColors.surface} strokeWidth={2.5} />
            </View>
            <Text style={styles.logoText}>MOTOTRACK</Text>
          </View>
        </View>

        <View style={styles.main}>{children}</View>

        <View style={styles.footer}>
          <View style={styles.footerTags}>
            {AuthFooterTags.map((tag) => (
              <View key={tag} style={styles.footerTag}>
                <Text style={styles.footerTagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.footerMeta}>Sprint 3 · 2024</Text>
        </View>
      </ScrollView>

      <Pressable style={styles.helpBtn} accessibilityLabel="Ayuda">
        <HelpCircle size={16} color={AuthColors.surface} />
      </Pressable>
    </View>
  );
}

export function AuthBadge() {
  return (
    <View style={styles.badge}>
      <View style={styles.badgeDot} />
      <Text style={styles.badgeText}>ACCESO SEGURO · MOTOTRACK MÉXICO</Text>
    </View>
  );
}

export function AuthDivider() {
  return (
    <View style={styles.dividerRow}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>o</Text>
      <View style={styles.dividerLine} />
    </View>
  );
}

export function AuthLegalText() {
  return (
    <Text style={styles.legal}>
      Al continuar aceptas los{' '}
      <Text style={styles.legalLink}>Términos de Servicio</Text> y la{' '}
      <Text style={styles.legalLink}>Política de Privacidad</Text> de MotoTrack México.
    </Text>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AuthColors.background,
    minHeight: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 24,
    paddingBottom: 32,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backText: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    letterSpacing: 1,
    color: AuthColors.textMuted,
    textTransform: 'uppercase',
  },
  logoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    width: 22,
    height: 22,
    borderRadius: 3,
    backgroundColor: AuthColors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    letterSpacing: 2,
    color: AuthColors.textMuted,
  },
  main: {
    flex: 1,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    gap: 24,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    borderWidth: 1,
    borderColor: AuthColors.border,
    backgroundColor: AuthColors.surface,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: AuthColors.green,
  },
  badgeText: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    letterSpacing: 1,
    color: AuthColors.textMuted,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: AuthColors.border,
  },
  dividerText: {
    fontSize: 12,
    color: AuthColors.textFaint,
  },
  legal: {
    fontSize: 11,
    lineHeight: 18,
    color: AuthColors.textFaint,
    textAlign: 'center',
  },
  legalLink: {
    textDecorationLine: 'underline',
    color: AuthColors.textMuted,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    maxWidth: 960,
    width: '100%',
    alignSelf: 'center',
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: AuthColors.border,
    marginTop: 'auto',
  },
  footerTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  footerTag: {
    borderWidth: 1,
    borderColor: AuthColors.border,
    backgroundColor: AuthColors.surface,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  footerTagText: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    letterSpacing: 0.5,
    color: AuthColors.textFaint,
  },
  footerMeta: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    letterSpacing: 1,
    color: AuthColors.textFaint,
  },
  helpBtn: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: AuthColors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
