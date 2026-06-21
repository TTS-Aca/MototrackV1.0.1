import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { MotoTrackTheme } from '@/constants/mototrack-theme';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';

type MultiOptionChipsProps<T extends string> = {
  label: string;
  options: readonly T[];
  values: T[];
  onChange: (values: T[]) => void;
  exclusive?: T;
};

export function MultiOptionChips<T extends string>({
  label,
  options,
  values,
  onChange,
  exclusive,
}: MultiOptionChipsProps<T>) {
  const { theme } = useMotoTrackTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const toggle = (option: T) => {
    if (exclusive && option === exclusive) {
      onChange(values.includes(option) ? [] : [option]);
      return;
    }

    const withoutExclusive = exclusive ? values.filter((v) => v !== exclusive) : values;
    if (withoutExclusive.includes(option)) {
      onChange(withoutExclusive.filter((v) => v !== option));
      return;
    }
    onChange([...withoutExclusive, option]);
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {options.map((option) => {
          const selected = values.includes(option);
          return (
            <Pressable
              key={option}
              onPress={() => toggle(option)}
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
