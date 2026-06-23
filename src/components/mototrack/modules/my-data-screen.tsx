import { Database } from 'lucide-react-native';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RecordScreenShell } from '@/components/mototrack/record-screen-shell';
import type { MotoTrackTheme } from '@/constants/mototrack-theme';
import { useAuth } from '@/contexts/auth-context';
import { useMotorcycle } from '@/contexts/motorcycle-context';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';
import { useUserProfile } from '@/contexts/user-profile-context';
import { motorcycleDisplayName } from '@/types/motorcycle';
import { userFullName } from '@/types/user-profile';

export function MyDataScreen() {
  const { profile } = useUserProfile();
  const { accountType } = useAuth();
  const { motorcycle } = useMotorcycle();
  const { theme } = useMotoTrackTheme();
  const rowStyles = useMemo(() => createRowStyles(theme), [theme]);
  const noteStyles = useMemo(() => createNoteStyles(theme), [theme]);

  if (!profile) {
    return null;
  }

  const phoneDisplay = profile.phone ? `${profile.countryCode} ${profile.phone}` : '—';

  const DataRow = ({ label, value }: { label: string; value: string }) => (
    <View style={rowStyles.row}>
      <Text style={rowStyles.label}>{label}</Text>
      <Text style={rowStyles.value}>{value || '—'}</Text>
    </View>
  );

  return (
    <RecordScreenShell
      title="Mis datos"
      subtitle="Información asociada a tu cuenta MotoTrack."
      icon={Database}
      onSave={() => {}}
      hideSaveButton
      hideMotoBadge>
      <DataRow label="NOMBRE COMPLETO" value={userFullName(profile)} />
      <DataRow label="AÑO DE NACIMIENTO" value={profile.birthYear} />
      <DataRow label="CORREO" value={profile.email} />
      <DataRow label="TELÉFONO" value={phoneDisplay} />
      <DataRow label="TIPO DE CUENTA" value={accountType === 'workshop' ? 'Taller' : 'Motociclista'} />
      {motorcycle ? (
        <DataRow label="MOTO REGISTRADA" value={motorcycleDisplayName(motorcycle)} />
      ) : null}
      <Text style={noteStyles.note}>
        Puedes solicitar la rectificación o eliminación de tus datos desde “Hablar con alguien”.
      </Text>
    </RecordScreenShell>
  );
}

function createNoteStyles(theme: MotoTrackTheme) {
  return StyleSheet.create({
    note: {
      fontSize: 11,
      lineHeight: 16,
      color: theme.textTertiary,
      marginTop: 8,
    },
  });
}

function createRowStyles(theme: MotoTrackTheme) {
  return StyleSheet.create({
    row: {
      gap: 6,
      padding: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
    },
    label: {
      fontSize: 9,
      fontFamily: 'monospace',
      letterSpacing: 1.2,
      color: theme.textMuted,
    },
    value: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
    },
  });
}
