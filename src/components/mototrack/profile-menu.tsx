import { useRouter, type Href } from 'expo-router';
import {
  ChevronRight,
  Database,
  FileText,
  MessageCircle,
  Shield,
  UserPen,
  X,
  type LucideIcon,
} from 'lucide-react-native';
import { useMemo } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { MotoTrackTheme } from '@/constants/mototrack-theme';
import { useAuth } from '@/contexts/auth-context';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';
import { useUserProfile } from '@/contexts/user-profile-context';
import { userFullName } from '@/types/user-profile';

type ProfileMenuItem = {
  label: string;
  icon: LucideIcon;
  href: Href;
};

const MENU_ITEMS: ProfileMenuItem[] = [
  { label: 'Editar perfil', icon: UserPen, href: '/perfil/editar' as Href },
  { label: 'Hablar con alguien', icon: MessageCircle, href: '/perfil/contacto' as Href },
  { label: 'Mis datos', icon: Database, href: '/perfil/mis-datos' as Href },
  { label: 'Términos y condiciones', icon: FileText, href: '/perfil/terminos' as Href },
  { label: 'Aviso de privacidad', icon: Shield, href: '/perfil/privacidad' as Href },
];

type ProfileMenuProps = {
  visible: boolean;
  onClose: () => void;
};

export function ProfileMenu({ visible, onClose }: ProfileMenuProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { userEmail } = useAuth();
  const { profile } = useUserProfile();
  const { theme } = useMotoTrackTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const displayName = profile ? userFullName(profile) : userEmail?.split('@')[0] ?? 'Usuario';

  const handleNavigate = (href: Href) => {
    onClose();
    router.push(href);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Cerrar menú" />
        <View style={[styles.panel, { paddingTop: insets.top + 12, paddingBottom: Math.max(insets.bottom, 16) }]}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHeaderCopy}>
              <Text style={styles.panelEyebrow}>MI PERFIL</Text>
              <Text style={styles.panelTitle}>{displayName}</Text>
              {userEmail ? <Text style={styles.panelEmail}>{userEmail}</Text> : null}
            </View>
            <Pressable onPress={onClose} style={styles.closeBtn} accessibilityLabel="Cerrar menú">
              <X size={18} color={theme.textSecondary} />
            </Pressable>
          </View>

          <View style={styles.menuList}>
            {MENU_ITEMS.map(({ label, icon: Icon, href }) => (
              <Pressable
                key={label}
                onPress={() => handleNavigate(href)}
                style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}>
                <View style={styles.menuIconWrap}>
                  <Icon size={18} color={theme.orange400} />
                </View>
                <Text style={styles.menuLabel}>{label}</Text>
                <ChevronRight size={16} color={theme.textMuted} />
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

function createStyles(theme: MotoTrackTheme) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      flexDirection: 'row',
    },
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.45)',
    },
    panel: {
      width: '82%',
      maxWidth: 320,
      backgroundColor: theme.background,
      borderLeftWidth: 1,
      borderLeftColor: theme.border,
      paddingHorizontal: 16,
      gap: 20,
    },
    panelHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    panelHeaderCopy: {
      flex: 1,
      gap: 4,
    },
    panelEyebrow: {
      fontSize: 9,
      fontFamily: 'monospace',
      letterSpacing: 1.5,
      color: theme.textMuted,
    },
    panelTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.text,
    },
    panelEmail: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    closeBtn: {
      width: 32,
      height: 32,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
    },
    menuList: {
      gap: 8,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 12,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
    },
    menuIconWrap: {
      width: 36,
      height: 36,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.orangeBadgeBg,
    },
    menuLabel: {
      flex: 1,
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
    },
    pressed: {
      opacity: 0.85,
    },
  });
}
