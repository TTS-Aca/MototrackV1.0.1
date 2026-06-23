import {
  ArrowUpRight,
  Bike,
  Fuel,
  LogOut,
  Menu,
  Plus,
  Settings,
  Wrench,
  X,
} from 'lucide-react-native';
import { useRouter, type Href } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeToggleButton } from '@/components/mototrack/theme-toggle-button';
import { MotorcycleSVG } from '@/components/mototrack/motorcycle-svg';
import { ProfileMenu } from '@/components/mototrack/profile-menu';
import { AI_INSIGHTS, MOTO_STATUS, MONTHLY_EXPENSE, formatCurrency } from '@/constants/dashboard-insights';
import type { MotoTrackTheme } from '@/constants/mototrack-theme';
import { useAuth } from '@/contexts/auth-context';
import { useMotorcycle } from '@/contexts/motorcycle-context';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';
import { motorcycleDisplayName } from '@/types/motorcycle';

const quickActions = [
  { label: 'Gasolina', icon: Fuel, href: '/gasolina' as Href },
  { label: 'Servicio', icon: Wrench, href: '/servicio' as Href },
  { label: 'Refacción', icon: Settings, href: '/refaccion' as Href },
] as const;

function userDisplayName(email: string | null): string {
  if (!email) return 'USUARIO';
  const local = email.split('@')[0] ?? 'usuario';
  return local.split(/[._-]/)[0].toUpperCase();
}

export function MobileDashboard() {
  const [quickOpen, setQuickOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signOut, userEmail } = useAuth();
  const { motorcycle, hasMotorcycle } = useMotorcycle();
  const { theme } = useMotoTrackTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const displayName = userDisplayName(userEmail);
  const motoLabel = motorcycle ? motorcycleDisplayName(motorcycle) : null;
  const greeting = motoLabel ? `HOLA, ${displayName} · ${motoLabel}` : `HOLA, ${displayName}`;

  const handleSignOut = async () => {
    await signOut();
    router.replace('/login');
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.statusBar}>
        <Text style={styles.statusTime}>9:41</Text>
        <Text style={styles.statusBrand}>MOTOTRACK</Text>
        <View style={styles.statusActions}>
          <ThemeToggleButton />
          <Pressable
            onPress={() => setMenuOpen(true)}
            accessibilityRole="button"
            accessibilityLabel="Abrir menú de perfil"
            style={({ pressed }) => [styles.menuBtn, pressed && styles.pressed]}>
            <Menu size={16} color={theme.textTertiary} strokeWidth={2} />
          </Pressable>
          <Pressable
            onPress={handleSignOut}
            accessibilityRole="button"
            accessibilityLabel="Cerrar sesión"
            style={({ pressed }) => [styles.signOutBtn, pressed && styles.pressed]}>
            <LogOut size={16} color={theme.textTertiary} strokeWidth={2} />
          </Pressable>
        </View>
      </View>

      <ProfileMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />

      <View style={[styles.body, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        {!hasMotorcycle ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyHero}>
              <Text style={styles.greeting}>{greeting}</Text>
              <Text style={styles.emptyTitle}>
                Ingresa tu moto para empezar.
              </Text>
              <Text style={styles.emptySubtitle}>
                Sin tu moto registrada no podemos mostrar estado, gastos ni mantenimiento.
              </Text>
            </View>

            <View style={styles.emptyMotoSection}>
              <View style={styles.emptyMotoSvgWrap}>
                <MotorcycleSVG width="100%" height={120} color={theme.diagramColor} />
              </View>
            </View>

            <Pressable
              style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
              onPress={() => router.push('/moto-setup')}>
              <Bike size={18} color={theme.white} />
              <Text style={styles.primaryBtnText}>Registrar mi moto</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View style={styles.mainSection}>
              <View style={styles.header}>
                <Text style={styles.greeting}>{greeting}</Text>
                <Text style={styles.title}>
                  Tu Moto, <Text style={styles.titleMuted}>al Instante.</Text>
                </Text>
              </View>

              <View style={styles.grid}>
                <Pressable
                  style={({ pressed }) => [styles.gridItem, pressed && styles.pressed]}
                  onPress={() => router.push('/estado-moto' as Href)}>
                  <View style={styles.card}>
                    <Text style={styles.cardLabel}>ESTADO DE MOTO</Text>
                    <View style={styles.semaforo}>
                      <View style={[styles.semaforoDot, styles.semaforoGreen]} />
                      <View style={[styles.semaforoDot, styles.semaforoYellow]} />
                      <View style={[styles.semaforoDot, styles.semaforoRed]} />
                    </View>
                    <Text style={styles.statusOptimal}>{MOTO_STATUS.label}</Text>
                  </View>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [styles.gridItem, pressed && styles.pressed]}
                  onPress={() => router.push('/gasto-mes' as Href)}>
                  <View style={styles.card}>
                    <Text style={styles.cardLabel}>GASTO / MES</Text>
                    <Text style={styles.expenseAmount}>
                      {formatCurrency(MONTHLY_EXPENSE.total)}
                    </Text>
                    <View style={styles.expenseTrend}>
                      <ArrowUpRight size={12} color={theme.orange400} />
                      <Text style={styles.expenseTrendText}>
                        +{MONTHLY_EXPENSE.trendPercent}% {MONTHLY_EXPENSE.trendLabel}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </View>

              <Pressable
                style={({ pressed }) => [pressed && styles.pressed]}
                onPress={() => router.push('/insight-ia' as Href)}>
                <View style={[styles.card, styles.insightCard]}>
                  <Text style={styles.cardLabel}>INSIGHT IA · UNA LÍNEA</Text>
                  <Text style={styles.insightText}>
                    <Text style={styles.insightHighlight}>{AI_INSIGHTS.headline.title}</Text>
                    {' · '}
                    {AI_INSIGHTS.headline.teaser}
                  </Text>
                </View>
              </Pressable>

              <View style={[styles.card, styles.maintenanceCard]}>
                <View style={styles.maintenanceCopy}>
                  <Text style={styles.cardLabel}>PRÓXIMO MANTENIMIENTO</Text>
                  <Text style={styles.maintenanceTitle}>320 km restantes</Text>
                  <Text style={styles.maintenanceSub}>~18 días · Cambio de aceite</Text>
                </View>
                <View style={styles.maintenanceIcon}>
                  <Wrench size={16} color={theme.textSecondary} />
                </View>
              </View>
            </View>

            {!quickOpen ? (
              <View style={styles.motoSection}>
                <View style={styles.motoSvgWrap}>
                  <MotorcycleSVG width="100%" height={130} color={theme.diagramColor} />
                </View>
                <View style={styles.motoBadge}>
                  <Text style={styles.motoBadgeText}>{motoLabel}</Text>
                </View>
                {motorcycle?.nickname ? (
                  <Text style={styles.motoHint}>{motorcycle.nickname}</Text>
                ) : (
                  <Text style={styles.motoHint}>
                    {motorcycle?.mileage} km · {motorcycle?.year}
                  </Text>
                )}
              </View>
            ) : (
              <View style={styles.spacerCompact} />
            )}

            <View style={styles.actionsSection}>
              <Pressable
                style={({ pressed }) => [styles.quickButton, pressed && styles.pressed]}
                onPress={() => setQuickOpen((open) => !open)}>
                {quickOpen ? (
                  <X size={16} color={theme.white} />
                ) : (
                  <Plus size={16} color={theme.white} />
                )}
                <Text style={styles.quickButtonText}>
                  {quickOpen ? 'Cancelar' : 'Registro Rápido'}
                </Text>
              </Pressable>

              {quickOpen && (
                <View style={styles.quickGrid}>
                  {quickActions.map(({ label, icon: Icon, href }) => (
                    <Pressable
                      key={label}
                      onPress={() => router.push(href)}
                      style={({ pressed }) => [styles.quickAction, pressed && styles.pressed]}>
                      <Icon size={18} color={theme.orange400} />
                      <Text style={styles.quickActionLabel}>{label.toUpperCase()}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          </>
        )}
      </View>
    </View>
  );
}

function createStyles(theme: MotoTrackTheme) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.background,
    },
    statusBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 4,
    },
    statusTime: {
      fontSize: 10,
      fontFamily: 'monospace',
      color: theme.textTertiary,
    },
    statusBrand: {
      fontSize: 16,
      fontFamily: 'monospace',
      letterSpacing: 2,
      color: theme.textTertiary,
    },
    statusActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    signOutBtn: {
      width: 32,
      height: 32,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuBtn: {
      width: 32,
      height: 32,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    body: {
      flex: 1,
      paddingHorizontal: 16,
    },
    emptyState: {
      flex: 1,
      gap: 20,
      paddingTop: 8,
    },
    emptyHero: {
      gap: 8,
    },
    emptyTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.text,
      lineHeight: 28,
    },
    emptySubtitle: {
      fontSize: 14,
      color: theme.textSecondary,
      lineHeight: 20,
    },
    emptyMotoSection: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.45,
    },
    emptyMotoSvgWrap: {
      width: '100%',
      maxWidth: 280,
    },
    primaryBtn: {
      backgroundColor: theme.orange500,
      borderRadius: 14,
      paddingVertical: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      minHeight: 48,
    },
    primaryBtnText: {
      color: theme.white,
      fontWeight: '700',
      fontSize: 15,
    },
    mainSection: {
      gap: 12,
    },
    spacerCompact: {
      minHeight: 4,
    },
    motoSection: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 4,
      minHeight: 120,
    },
    motoSvgWrap: {
      width: '100%',
      maxWidth: 320,
      opacity: 0.9,
    },
    motoBadge: {
      marginTop: 8,
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
      letterSpacing: 1.5,
      color: theme.textSecondary,
    },
    motoHint: {
      marginTop: 4,
      fontSize: 8,
      fontFamily: 'monospace',
      letterSpacing: 1,
      color: theme.textMuted,
    },
    actionsSection: {
      gap: 10,
      paddingTop: 12,
    },
    header: {
      paddingTop: 4,
    },
    greeting: {
      fontSize: 9,
      fontFamily: 'monospace',
      letterSpacing: 1.5,
      color: theme.textMuted,
      marginBottom: 2,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.text,
      lineHeight: 20,
    },
    titleMuted: {
      fontWeight: '400',
      color: theme.textSecondary,
    },
    grid: {
      flexDirection: 'row',
      gap: 10,
    },
    gridItem: {
      flex: 1,
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 14,
      borderWidth: 1,
      borderColor: theme.border,
    },
    cardLabel: {
      fontSize: 8,
      fontFamily: 'monospace',
      letterSpacing: 1.2,
      color: theme.textMuted,
      marginBottom: 10,
    },
    semaforo: {
      flexDirection: 'row',
      gap: 6,
      marginBottom: 8,
    },
    semaforoDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    semaforoGreen: {
      backgroundColor: theme.green400,
    },
    semaforoYellow: {
      backgroundColor: 'rgba(250, 204, 21, 0.15)',
    },
    semaforoRed: {
      backgroundColor: 'rgba(248, 113, 113, 0.15)',
    },
    statusOptimal: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.green400,
    },
    expenseAmount: {
      fontSize: 24,
      fontWeight: '900',
      color: theme.text,
      letterSpacing: -0.5,
      lineHeight: 26,
      marginBottom: 6,
    },
    expenseTrend: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    expenseTrendText: {
      fontSize: 10,
      fontFamily: 'monospace',
      color: theme.orange400,
    },
    insightCard: {
      borderLeftWidth: 2,
      borderLeftColor: theme.orange500,
      padding: 16,
    },
    insightText: {
      fontSize: 14,
      color: theme.text,
      lineHeight: 20,
    },
    insightHighlight: {
      color: theme.orange400,
      fontWeight: '600',
    },
    maintenanceCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
    },
    maintenanceCopy: {
      flex: 1,
    },
    maintenanceTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.text,
    },
    maintenanceSub: {
      fontSize: 10,
      color: theme.textTertiary,
      marginTop: 2,
    },
    maintenanceIcon: {
      width: 36,
      height: 36,
      borderRadius: 12,
      backgroundColor: theme.surfaceMuted,
      alignItems: 'center',
      justifyContent: 'center',
    },
    quickButton: {
      backgroundColor: theme.orange500,
      borderRadius: 14,
      paddingVertical: 11,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    quickButtonText: {
      color: theme.white,
      fontWeight: '700',
      fontSize: 14,
    },
    quickGrid: {
      flexDirection: 'row',
      gap: 8,
      height: 84,
    },
    quickAction: {
      flex: 1,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    quickActionLabel: {
      fontSize: 9,
      fontFamily: 'monospace',
      color: theme.textSecondary,
    },
    pressed: {
      opacity: 0.85,
      transform: [{ scale: 0.98 }],
    },
  });
}
