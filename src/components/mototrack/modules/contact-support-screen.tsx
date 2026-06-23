import { MessageCircle } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Linking, Pressable, StyleSheet, Text } from 'react-native';

import { RecordField } from '@/components/mototrack/record-field';
import { RecordScreenShell } from '@/components/mototrack/record-screen-shell';
import type { MotoTrackTheme } from '@/constants/mototrack-theme';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';
import { useUserProfile } from '@/contexts/user-profile-context';
import { userFullName } from '@/types/user-profile';

const SUPPORT_EMAIL = 'soporte@mototrack.mx';
const SUPPORT_WHATSAPP = '529981234567';

export function ContactSupportScreen() {
  const { profile } = useUserProfile();
  const { theme } = useMotoTrackTheme();
  const styles = createStyles(theme);
  const [saving, setSaving] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = () => {
    if (!subject.trim() || !message.trim()) {
      Alert.alert('Mensaje incompleto', 'Escribe un asunto y tu mensaje para contactarnos.');
      return;
    }

    setSaving(true);
    const userName = profile ? userFullName(profile) : 'Usuario';
    const body = encodeURIComponent(
      `Hola, soy ${userName}.\n\nAsunto: ${subject.trim()}\n\n${message.trim()}`,
    );
    Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject.trim())}&body=${body}`);
    Alert.alert('Mensaje listo', 'Se abrió tu app de correo para enviar el mensaje.');
    setSaving(false);
  };

  const openWhatsApp = () => {
    const userName = profile ? userFullName(profile) : 'Usuario';
    const text = encodeURIComponent(`Hola, soy ${userName}. Necesito ayuda con MotoTrack.`);
    Linking.openURL(`https://wa.me/${SUPPORT_WHATSAPP}?text=${text}`);
  };

  return (
    <RecordScreenShell
      title="Hablar con alguien"
      subtitle="Escríbenos y te respondemos lo antes posible."
      icon={MessageCircle}
      onSave={handleSave}
      saving={saving}
      saveLabel="ENVIAR MENSAJE"
      hideMotoBadge>
      <RecordField
        label="ASUNTO"
        value={subject}
        onChangeText={setSubject}
        placeholder="Ej. Problema con mi cuenta"
      />
      <RecordField
        label="MENSAJE"
        value={message}
        onChangeText={setMessage}
        placeholder="Cuéntanos en qué podemos ayudarte..."
        multiline
        style={styles.messageInput}
      />
      <Pressable style={({ pressed }) => [styles.whatsappBtn, pressed && styles.pressed]} onPress={openWhatsApp}>
        <Text style={styles.whatsappBtnText}>ESCRIBIR POR WHATSAPP</Text>
      </Pressable>
      <Text style={styles.hint}>También puedes escribirnos a {SUPPORT_EMAIL}</Text>
    </RecordScreenShell>
  );
}

function createStyles(theme: MotoTrackTheme) {
  return StyleSheet.create({
    messageInput: {
      minHeight: 120,
      textAlignVertical: 'top',
    },
    whatsappBtn: {
      borderWidth: 1,
      borderColor: '#25D366',
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: 'center',
      backgroundColor: 'rgba(37, 211, 102, 0.08)',
    },
    whatsappBtnText: {
      fontSize: 10,
      fontFamily: 'monospace',
      letterSpacing: 1,
      color: '#25D366',
      fontWeight: '700',
    },
    hint: {
      fontSize: 11,
      color: theme.textTertiary,
      textAlign: 'center',
    },
    pressed: {
      opacity: 0.85,
    },
  });
}
