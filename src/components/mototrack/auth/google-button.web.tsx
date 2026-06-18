import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AuthColors } from '@/constants/auth-theme';
import { Fonts } from '@/constants/theme';

type GoogleButtonProps = {
  onPress?: () => void;
};

export function GoogleButton({ onPress }: GoogleButtonProps) {
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
      <GoogleMark />
      <Text style={styles.label}>Continuar con Google</Text>
    </Pressable>
  );
}

function GoogleMark() {
  return (
    <View style={styles.markWrap}>
      <Text style={[styles.markLetter, { color: AuthColors.googleBlue }]}>G</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: AuthColors.surface,
    borderWidth: 1,
    borderColor: AuthColors.border,
    paddingVertical: 13,
  },
  pressed: {
    opacity: 0.85,
  },
  markWrap: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markLetter: {
    fontSize: 16,
    fontWeight: '700',
  },
  label: {
    fontSize: 14,
    color: AuthColors.text,
  },
});
