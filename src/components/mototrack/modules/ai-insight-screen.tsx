import { Brain } from 'lucide-react-native';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RecordScreenShell } from '@/components/mototrack/record-screen-shell';
import { AI_INSIGHTS } from '@/constants/dashboard-insights';
import type { MotoTrackTheme } from '@/constants/mototrack-theme';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';

export function AiInsightScreen() {
  const { theme } = useMotoTrackTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { headline } = AI_INSIGHTS;

  return (
    <RecordScreenShell
      title="Insight IA"
      subtitle="Análisis automático de tus patrones de uso y gasto."
      icon={Brain}
      onSave={() => {}}
      hideSaveButton>
      <View style={styles.headlineCard}>
        <Text style={styles.headlineLabel}>INSIGHT PRINCIPAL</Text>
        <Text style={styles.headlineTitle}>{headline.title}</Text>
        <Text style={styles.headlineBody}>{headline.body}</Text>
      </View>

      <View style={styles.emptyCard}>
        <Text style={styles.emptyLabel}>MÁS INSIGHTS</Text>
        <Text style={styles.emptyText}>
         PROXIMAMENTE
        </Text>
      </View>
    </RecordScreenShell>
  );
}

function createStyles(theme: MotoTrackTheme) {
  return StyleSheet.create({
    headlineCard: {
      gap: 10,
      padding: 18,
      borderRadius: 16,
      borderWidth: 1,
      borderLeftWidth: 3,
      borderColor: theme.border,
      borderLeftColor: theme.orange500,
      backgroundColor: theme.surface,
    },
    headlineLabel: {
      fontSize: 9,
      fontFamily: 'monospace',
      letterSpacing: 1.5,
      color: theme.textMuted,
    },
    headlineTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.orange400,
    },
    headlineBody: {
      fontSize: 14,
      lineHeight: 21,
      color: theme.textSecondary,
    },
    emptyCard: {
      gap: 8,
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surfaceMuted,
    },
    emptyLabel: {
      fontSize: 9,
      fontFamily: 'monospace',
      letterSpacing: 1.5,
      color: theme.textMuted,
    },
    emptyText: {
      fontSize: 13,
      lineHeight: 19,
      color: theme.textTertiary,
    },
  });
}
