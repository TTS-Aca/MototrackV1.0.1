import { FileText, Shield } from 'lucide-react-native';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RecordScreenShell } from '@/components/mototrack/record-screen-shell';
import { PRIVACY_NOTICE, TERMS_AND_CONDITIONS } from '@/constants/legal-content';
import type { MotoTrackTheme } from '@/constants/mototrack-theme';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';

type LegalDocumentScreenProps = {
  type: 'terms' | 'privacy';
};

export function LegalDocumentScreen({ type }: LegalDocumentScreenProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useMotoTrackTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const isTerms = type === 'terms';
  const title = isTerms ? 'Términos y condiciones' : 'Aviso de privacidad';
  const subtitle = isTerms
    ? 'Condiciones de uso de la plataforma MotoTrack.'
    : 'Cómo tratamos y protegemos tus datos personales.';
  const content = isTerms ? TERMS_AND_CONDITIONS : PRIVACY_NOTICE;

  return (
    <RecordScreenShell
      title={title}
      subtitle={subtitle}
      icon={isTerms ? FileText : Shield}
      onSave={() => {}}
      hideSaveButton
      hideMotoBadge>
      <View style={styles.contentWrap}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 16) }}>
          <Text style={styles.content}>{content}</Text>
        </ScrollView>
      </View>
    </RecordScreenShell>
  );
}

function createStyles(theme: MotoTrackTheme) {
  return StyleSheet.create({
    contentWrap: {
      maxHeight: 520,
    },
    content: {
      fontSize: 13,
      lineHeight: 21,
      color: theme.textSecondary,
    },
  });
}
