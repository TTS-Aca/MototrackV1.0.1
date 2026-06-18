import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { MotoTrackTheme } from '@/constants/mototrack-theme';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';

type OptionChipsProps = {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
};

export function OptionChips({ label, options, value, onChange }: OptionChipsProps) {
  const { theme } = useMotoTrackTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {options.map((option) => {
          const selected = option === value;
          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              style={[styles.chip, selected && styles.chipSelected]}>
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function createStyles(theme: MotoTrackTheme) {
  return StyleSheet.create({
    wrap: {
      gap: 8,
    },
    label: {
      fontSize: 9,
      fontFamily: 'monospace',
      letterSpacing: 1.2,
      color: theme.textMuted,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    chip: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
    },
    chipSelected: {
      borderColor: theme.orange500,
      backgroundColor: theme.orangeBadgeBg,
    },
    chipText: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    chipTextSelected: {
      color: theme.orange400,
      fontWeight: '600',
    },
  });
}
