import { Moon, Sun } from 'lucide-react-native';
import { Pressable, StyleSheet } from 'react-native';

import { useMotoTrackTheme } from '@/contexts/theme-mode-context';

type ThemeToggleButtonProps = {
  size?: number;
};

export function ThemeToggleButton({ size = 16 }: ThemeToggleButtonProps) {
  const { mode, toggleMode, theme } = useMotoTrackTheme();
  const Icon = mode === 'dark' ? Sun : Moon;

  return (
    <Pressable
      onPress={toggleMode}
      accessibilityRole="button"
      accessibilityLabel={mode === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Icon size={size} color={theme.textTertiary} strokeWidth={2} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
