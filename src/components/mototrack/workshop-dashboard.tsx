import {
  Camera,
  Clock,
  LogOut,
  MapPin,
  Menu,
  Phone,
  Settings,
  Truck,
  Wrench,
} from 'lucide-react-native';
import { useRouter, type Href } from 'expo-router';
import { useMemo, useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeToggleButton } from '@/components/mototrack/theme-toggle-button';
import { ProfileMenu } from '@/components/mototrack/profile-menu';
import type { MotoTrackTheme } from '@/constants/mototrack-theme';
import { useAuth } from '@/contexts/auth-context';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';
import { useWorkshop } from '@/contexts/workshop-context';

export function WorkshopDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const { workshop } = useWorkshop();
  const { theme } = useMotoTrackTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.replace('/login');
  };

  const openWhatsApp = () => {
    if (!workshop?.phone) return;
    Linking.openURL(`https://wa.me/52${workshop.phone}`);
  };

  if (!workshop) {
    return (
      <View style={[styles.root, { paddingTop: insets.top, paddingHorizontal: 20 }]}>
        <Text style={styles.emptyTitle}>Completa el registro de tu taller</Text>
        <Pressable
          style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
          onPress={() => router.push('/taller-register' as Href)}>
          <Text style={styles.primaryBtnText}>Registrar taller</Text>
        </Pressable>
      </View>
    );
  }

  const openDays = workshop.schedule.filter((d) => !d.closed);
  const scheduleSummary =
    openDays.length > 0
      ? `${openDays[0].day.slice(0, 3)}–${openDays[openDays.length - 1].day.slice(0, 3)} · ${openDays[0].open}–${openDays[0].close}`
      : 'Sin horario';

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.statusBar}>
        <Text style={styles.statusTime}>9:41</Text>
        <Text style={styles.statusBrand}>MOTOTRACK · TALLER</Text>
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

      <ScrollView
        contentContainerStyle={[
          styles.body,
          { paddingBottom: Math.max(insets.bottom, 24) },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>PANEL DEL TALLER</Text>
          <Text style={styles.title}>{workshop.name}</Text>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusPill,
                workshop.onVacation ? styles.statusVacation : styles.statusOpen,
              ]}>
              <Text
                style={[
                  styles.statusPillText,
                  workshop.onVacation ? styles.statusVacationText : styles.statusOpenText,
                ]}>
                {workshop.onVacation ? 'CERRADO · VACACIONES' : 'ABIERTO'}
              </Text>
            </View>
            {workshop.offersTowService ? (
              <View style={styles.towBadge}>
                <Truck size={12} color={theme.orange400} />
                <Text style={styles.towBadgeText}>AUXILIO</Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>MARCAS</Text>
            <Text style={styles.cardValue}>{workshop.brands.join(' · ')}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>FOTOS</Text>
            <Text style={styles.cardValue}>{workshop.photos.length} / 6</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <MapPin size={16} color={theme.orange400} />
            <Text style={styles.infoText}>{workshop.address}</Text>
          </View>
          <Pressable style={styles.infoRow} onPress={openWhatsApp}>
            <Phone size={16} color="#25D366" />
            <Text style={[styles.infoText, styles.linkText]}>WhatsApp · {workshop.phone}</Text>
          </Pressable>
          <View style={styles.infoRow}>
            <Clock size={16} color={theme.textSecondary} />
            <Text style={styles.infoText}>{scheduleSummary}</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>GESTIÓN DEL NEGOCIO</Text>

        <Pressable
          style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]}
          onPress={() => router.push('/taller-profile' as Href)}>
          <View style={[styles.actionIcon, { backgroundColor: theme.orangeBadgeBg }]}>
            <Camera size={18} color={theme.orange400} />
          </View>
          <View style={styles.actionCopy}>
            <Text style={styles.actionTitle}>Fotos del taller</Text>
            <Text style={styles.actionSub}>Sube imágenes para generar confianza</Text>
          </View>
          <Settings size={16} color={theme.textMuted} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]}
          onPress={() => router.push('/taller-profile' as Href)}>
          <View style={[styles.actionIcon, { backgroundColor: theme.surfaceMuted }]}>
            <Clock size={18} color={theme.textSecondary} />
          </View>
          <View style={styles.actionCopy}>
            <Text style={styles.actionTitle}>Horarios y vacaciones</Text>
            <Text style={styles.actionSub}>
              Actualiza horarios o marca cierre por vacaciones
            </Text>
          </View>
          <Settings size={16} color={theme.textMuted} />
        </Pressable>

        <View style={styles.heroIcon}>
          <Wrench size={48} color={theme.diagramColor} strokeWidth={1.5} />
          <Text style={styles.heroHint}>
            Los motociclistas te encontrarán en “talleres cercanos” según tu ubicación en el mapa.
          </Text>
        </View>
      </ScrollView>
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
      fontSize: 11,
      fontFamily: 'monospace',
      letterSpacing: 1.5,
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
      paddingHorizontal: 16,
      gap: 14,
    },
    header: {
      gap: 6,
      paddingTop: 8,
    },
    greeting: {
      fontSize: 9,
      fontFamily: 'monospace',
      letterSpacing: 1.5,
      color: theme.textMuted,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.text,
    },
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 4,
    },
    statusPill: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
    },
    statusOpen: {
      backgroundColor: 'rgba(74, 222, 128, 0.12)',
    },
    statusVacation: {
      backgroundColor: 'rgba(248, 113, 113, 0.12)',
    },
    statusPillText: {
      fontSize: 9,
      fontFamily: 'monospace',
      letterSpacing: 1,
      fontWeight: '700',
    },
    statusOpenText: {
      color: theme.green400,
    },
    statusVacationText: {
      color: '#f87171',
    },
    towBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    towBadgeText: {
      fontSize: 9,
      fontFamily: 'monospace',
      color: theme.orange400,
    },
    grid: {
      flexDirection: 'row',
      gap: 10,
    },
    card: {
      flex: 1,
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
      marginBottom: 8,
    },
    cardValue: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.text,
    },
    infoCard: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border,
      gap: 12,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 10,
    },
    infoText: {
      flex: 1,
      fontSize: 13,
      color: theme.textSecondary,
      lineHeight: 18,
    },
    linkText: {
      color: '#25D366',
    },
    sectionLabel: {
      fontSize: 9,
      fontFamily: 'monospace',
      letterSpacing: 1.5,
      color: theme.textMuted,
      marginTop: 4,
    },
    actionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 14,
      borderWidth: 1,
      borderColor: theme.border,
    },
    actionIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionCopy: {
      flex: 1,
      gap: 2,
    },
    actionTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.text,
    },
    actionSub: {
      fontSize: 11,
      color: theme.textTertiary,
    },
    heroIcon: {
      alignItems: 'center',
      gap: 10,
      paddingVertical: 20,
      opacity: 0.7,
    },
    heroHint: {
      fontSize: 11,
      color: theme.textMuted,
      textAlign: 'center',
      lineHeight: 16,
      paddingHorizontal: 20,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.text,
      marginBottom: 16,
    },
    primaryBtn: {
      backgroundColor: theme.orange500,
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: 'center',
    },
    primaryBtnText: {
      color: theme.white,
      fontWeight: '700',
    },
    pressed: {
      opacity: 0.85,
      transform: [{ scale: 0.98 }],
    },
  });
}
