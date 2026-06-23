import { Activity } from 'lucide-react-native';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RecordScreenShell } from '@/components/mototrack/record-screen-shell';
import { MOTO_STATUS, type MotoHealthLevel } from '@/constants/dashboard-insights';
import type { MotoTrackTheme } from '@/constants/mototrack-theme';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';
import { useMotorcycle } from '@/contexts/motorcycle-context';
import { motorcycleDisplayName } from '@/types/motorcycle';

function statusColor(level: MotoHealthLevel, theme: MotoTrackTheme): string {
  if (level === 'optimal') return theme.green400;
  if (level === 'attention') return '#facc15';
  return '#f87171';
}

function statusLabel(level: MotoHealthLevel): string {
  if (level === 'optimal') return 'OK';
  if (level === 'attention') return 'Revisar';
  return 'Urgente';
}

export function MotoStatusScreen() {
  const { motorcycle } = useMotorcycle();
  const { theme } = useMotoTrackTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const motoLabel = motorcycle ? motorcycleDisplayName(motorcycle) : 'Tu moto';

  return (
    <RecordScreenShell
      title="Estado de moto"
      subtitle={`Diagnóstico general de ${motoLabel}.`}
      icon={Activity}
      onSave={() => {}}
      hideSaveButton
      hideMotoBadge>
      <View style={styles.heroCard}>
        <Text style={styles.heroLabel}>SEMÁFORO GENERAL</Text>
        <View style={styles.semaforo}>
          <View style={[styles.dot, styles.dotGreen, MOTO_STATUS.level === 'optimal' && styles.dotActive]} />
          <View style={[styles.dot, styles.dotYellow, MOTO_STATUS.level === 'attention' && styles.dotActive]} />
          <View style={[styles.dot, styles.dotRed, MOTO_STATUS.level === 'critical' && styles.dotActive]} />
        </View>
        <Text style={styles.heroStatus}>{MOTO_STATUS.label}</Text>
        <Text style={styles.heroSummary}>{MOTO_STATUS.summary}</Text>
      </View>

      <Text style={styles.sectionLabel}>COMPONENTES</Text>
      {MOTO_STATUS.checks.map((check) => (
        <View key={check.label} style={styles.checkRow}>
          <View style={styles.checkCopy}>
            <Text style={styles.checkTitle}>{check.label}</Text>
            <Text style={styles.checkDetail}>{check.detail}</Text>
          </View>
          <View style={[styles.checkBadge, { borderColor: statusColor(check.status, theme) }]}>
            <Text style={[styles.checkBadgeText, { color: statusColor(check.status, theme) }]}>
              {statusLabel(check.status)}
            </Text>
          </View>
        </View>
      ))}
    </RecordScreenShell>
  );
}

function createStyles(theme: MotoTrackTheme) {
  return StyleSheet.create({
    heroCard: {
      gap: 10,
      padding: 20,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      alignItems: 'center',
    },
    heroLabel: {
      fontSize: 9,
      fontFamily: 'monospace',
      letterSpacing: 1.5,
      color: theme.textMuted,
    },
    semaforo: {
      flexDirection: 'row',
      gap: 10,
      marginVertical: 4,
    },
    dot: {
      width: 14,
      height: 14,
      borderRadius: 7,
      opacity: 0.35,
    },
    dotActive: {
      opacity: 1,
    },
    dotGreen: {
      backgroundColor: theme.green400,
    },
    dotYellow: {
      backgroundColor: '#facc15',
    },
    dotRed: {
      backgroundColor: '#f87171',
    },
    heroStatus: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.green400,
    },
    heroSummary: {
      fontSize: 13,
      lineHeight: 19,
      color: theme.textSecondary,
      textAlign: 'center',
    },
    sectionLabel: {
      fontSize: 9,
      fontFamily: 'monospace',
      letterSpacing: 1.5,
      color: theme.textMuted,
      marginTop: 4,
    },
    checkRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      padding: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
    },
    checkCopy: {
      flex: 1,
      gap: 4,
    },
    checkTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.text,
    },
    checkDetail: {
      fontSize: 12,
      color: theme.textSecondary,
      lineHeight: 17,
    },
    checkBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      borderWidth: 1,
    },
    checkBadgeText: {
      fontSize: 9,
      fontFamily: 'monospace',
      letterSpacing: 0.5,
      fontWeight: '700',
    },
  });
}
