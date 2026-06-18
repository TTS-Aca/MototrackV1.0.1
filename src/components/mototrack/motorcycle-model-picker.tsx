import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { MotoTrackTheme } from '@/constants/mototrack-theme';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';

type MotorcycleModelPickerProps = {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
};

export function MotorcycleModelPicker({
  label,
  options,
  value,
  onChange,
  placeholder = 'Seleccionar modelo',
  emptyMessage = 'Sin modelos en catálogo',
}: MotorcycleModelPickerProps) {
  const [visible, setVisible] = useState(false);
  const { theme } = useMotoTrackTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const displayValue = value || placeholder;
  const hasOptions = options.length > 0;

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.trigger,
          !hasOptions && styles.triggerDisabled,
          pressed && hasOptions && styles.pressed,
        ]}
        onPress={() => hasOptions && setVisible(true)}
        disabled={!hasOptions}>
        <Text style={[styles.triggerText, !value && styles.triggerPlaceholder]}>
          {hasOptions ? displayValue : emptyMessage}
        </Text>
        {hasOptions ? <Text style={styles.chevron}>▼</Text> : null}
      </Pressable>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.card}>
            <Text style={styles.modalTitle}>{label}</Text>
            <ScrollView style={styles.list} keyboardShouldPersistTaps="handled">
              {options.map((option) => (
                <Pressable
                  key={option}
                  style={({ pressed }) => [
                    styles.option,
                    option === value && styles.optionActive,
                    pressed && styles.pressed,
                  ]}
                  onPress={() => {
                    onChange(option);
                    setVisible(false);
                  }}>
                  <Text style={[styles.optionText, option === value && styles.optionTextActive]}>
                    {option}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
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
    trigger: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      paddingVertical: 13,
      paddingHorizontal: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    triggerDisabled: {
      opacity: 0.6,
    },
    triggerText: {
      fontSize: 14,
      color: theme.text,
      flex: 1,
    },
    triggerPlaceholder: {
      color: theme.textMuted,
    },
    chevron: {
      fontSize: 10,
      color: theme.textMuted,
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.55)',
      justifyContent: 'center',
      paddingHorizontal: 24,
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.border,
      padding: 16,
      maxHeight: '70%',
    },
    modalTitle: {
      fontSize: 13,
      fontFamily: 'monospace',
      letterSpacing: 1,
      color: theme.textMuted,
      marginBottom: 8,
    },
    list: {
      maxHeight: 360,
    },
    option: {
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderRadius: 10,
    },
    optionActive: {
      backgroundColor: theme.background,
    },
    optionText: {
      fontSize: 15,
      color: theme.text,
    },
    optionTextActive: {
      color: theme.orange400,
      fontWeight: '600',
    },
    pressed: {
      opacity: 0.85,
    },
  });
}
