import { ArrowUpRight, Wallet } from 'lucide-react-native';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RecordScreenShell } from '@/components/mototrack/record-screen-shell';
import { MONTHLY_EXPENSE, formatCurrency } from '@/constants/dashboard-insights';
import type { MotoTrackTheme } from '@/constants/mototrack-theme';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';

export function MonthlyExpenseScreen() {
  const { theme } = useMotoTrackTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <RecordScreenShell
      title="Gasto del mes"
      subtitle="Desglose de lo que llevas gastado este mes."
      icon={Wallet}
      onSave={() => {}}
      hideSaveButton>
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>TOTAL ACUMULADO</Text>
        <Text style={styles.totalAmount}>{formatCurrency(MONTHLY_EXPENSE.total)}</Text>
        <View style={styles.trendRow}>
          <ArrowUpRight size={14} color={theme.orange400} />
          <Text style={styles.trendText}>
            +{MONTHLY_EXPENSE.trendPercent}% {MONTHLY_EXPENSE.trendLabel}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>POR CATEGORÍA</Text>
      {MONTHLY_EXPENSE.items.map((item) => (
        <View key={item.category} style={styles.itemRow}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>{item.category}</Text>
            <Text style={styles.itemAmount}>{formatCurrency(item.amount)}</Text>
          </View>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${item.percent}%` }]} />
          </View>
          <Text style={styles.itemPercent}>{item.percent}% del total</Text>
        </View>
      ))}

      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>Nota</Text>
        <Text style={styles.noteText}>
          Los montos se calculan a partir de tus registros de gasolina, servicio y refacción.
        </Text>
      </View>
    </RecordScreenShell>
  );
}

function createStyles(theme: MotoTrackTheme) {
  return StyleSheet.create({
    totalCard: {
      gap: 8,
      padding: 20,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
    },
    totalLabel: {
      fontSize: 9,
      fontFamily: 'monospace',
      letterSpacing: 1.5,
      color: theme.textMuted,
    },
    totalAmount: {
      fontSize: 36,
      fontWeight: '900',
      color: theme.text,
      letterSpacing: -1,
    },
    trendRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    trendText: {
      fontSize: 12,
      fontFamily: 'monospace',
      color: theme.orange400,
    },
    sectionLabel: {
      fontSize: 9,
      fontFamily: 'monospace',
      letterSpacing: 1.5,
      color: theme.textMuted,
      marginTop: 4,
    },
    itemRow: {
      gap: 8,
      padding: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.text,
    },
    itemAmount: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
    },
    barTrack: {
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.surfaceMuted,
      overflow: 'hidden',
    },
    barFill: {
      height: '100%',
      backgroundColor: theme.orange500,
      borderRadius: 3,
    },
    itemPercent: {
      fontSize: 10,
      fontFamily: 'monospace',
      color: theme.textMuted,
    },
    noteCard: {
      gap: 6,
      padding: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surfaceMuted,
    },
    noteTitle: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.text,
    },
    noteText: {
      fontSize: 12,
      lineHeight: 17,
      color: theme.textSecondary,
    },
  });
}
