import { Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { AuthColors } from '@/constants/auth-theme';
import { Fonts } from '@/constants/theme';

type AuthFieldProps = TextInputProps & {
  label: string;
  icon?: 'mail' | 'lock';
  rightLabel?: string;
  onRightLabelPress?: () => void;
  secureToggle?: boolean;
};

export function AuthField({
  label,
  icon,
  rightLabel,
  onRightLabelPress,
  secureToggle,
  secureTextEntry,
  ...props
}: AuthFieldProps) {
  const [hidden, setHidden] = useState(Boolean(secureTextEntry));

  const LeftIcon = icon === 'mail' ? Mail : icon === 'lock' ? Lock : null;

  return (
    <View style={styles.wrap}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {rightLabel && (
          <Pressable onPress={onRightLabelPress}>
            <Text style={styles.rightLabel}>{rightLabel}</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.inputWrap}>
        {LeftIcon && (
          <View style={styles.leftIcon}>
            <LeftIcon size={16} color={AuthColors.textFaint} />
          </View>
        )}
        <TextInput
          {...props}
          secureTextEntry={secureToggle ? hidden : secureTextEntry}
          placeholderTextColor={AuthColors.textFaint}
          style={[styles.input, LeftIcon && styles.inputWithIcon, secureToggle && styles.inputWithToggle]}
        />
        {secureToggle && (
          <Pressable
            onPress={() => setHidden((value) => !value)}
            style={styles.toggleBtn}
            accessibilityLabel={hidden ? 'Mostrar contraseña' : 'Ocultar contraseña'}>
            {hidden ? (
              <Eye size={16} color={AuthColors.textFaint} />
            ) : (
              <EyeOff size={16} color={AuthColors.textFaint} />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  label: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    letterSpacing: 1.2,
    color: AuthColors.textMuted,
  },
  rightLabel: {
    fontSize: 11,
    color: AuthColors.textMuted,
    textDecorationLine: 'underline',
  },
  inputWrap: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    position: 'absolute',
    left: 14,
    zIndex: 1,
    pointerEvents: 'none',
  },
  input: {
    flex: 1,
    backgroundColor: AuthColors.surface,
    borderWidth: 1,
    borderColor: AuthColors.border,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    color: AuthColors.text,
  },
  inputWithIcon: {
    paddingLeft: 42,
  },
  inputWithToggle: {
    paddingRight: 42,
  },
  toggleBtn: {
    position: 'absolute',
    right: 12,
    padding: 4,
  },
});
