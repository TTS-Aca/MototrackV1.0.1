import { Camera, Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { RecordField } from '@/components/mototrack/record-field';
import { RecordScreenShell } from '@/components/mototrack/record-screen-shell';
import type { MotoTrackTheme } from '@/constants/mototrack-theme';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';
import { useWorkshop } from '@/contexts/workshop-context';
import type { DaySchedule } from '@/types/workshop';

const MAX_PHOTOS = 6;

export function WorkshopProfileScreen() {
  const router = useRouter();
  const { workshop, updateWorkshop } = useWorkshop();
  const { theme } = useMotoTrackTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [saving, setSaving] = useState(false);
  const [schedule, setSchedule] = useState<DaySchedule[]>(workshop?.schedule ?? []);
  const [onVacation, setOnVacation] = useState(workshop?.onVacation ?? false);
  const [vacationNote, setVacationNote] = useState(workshop?.vacationNote ?? '');
  const [photos, setPhotos] = useState<string[]>(workshop?.photos ?? []);

  const updateDay = (index: number, patch: Partial<DaySchedule>) => {
    setSchedule((current) =>
      current.map((entry, i) => (i === index ? { ...entry, ...patch } : entry)),
    );
  };

  const addPhoto = () => {
    if (photos.length >= MAX_PHOTOS) {
      Alert.alert('Límite alcanzado', `Puedes subir hasta ${MAX_PHOTOS} fotos del taller.`);
      return;
    }
    setPhotos((current) => [...current, `Foto ${current.length + 1}`]);
    Alert.alert('Foto agregada', 'En producción se abrirá la cámara o galería.');
  };

  const removePhoto = (index: number) => {
    setPhotos((current) => current.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    setSaving(true);
    updateWorkshop({
      schedule,
      onVacation,
      vacationNote: vacationNote.trim() || undefined,
      photos,
    });
    Alert.alert('Perfil actualizado', 'Los cambios de tu taller se guardaron correctamente.');
    router.back();
    setSaving(false);
  };

  if (!workshop) {
    return null;
  }

  return (
    <RecordScreenShell
      title="Gestión del perfil"
      subtitle="Fotos, horarios y estado de tu taller."
      icon={Settings}
      onSave={handleSave}
      saving={saving}
      saveLabel="GUARDAR CAMBIOS"
      hideMotoBadge>
      <Text style={styles.sectionTitle}>FOTOS DEL TALLER</Text>
      <Text style={styles.hint}>Las fotos generan confianza en motociclistas que buscan taller.</Text>
      <View style={styles.photoGrid}>
        {photos.map((photo, index) => (
          <Pressable
            key={`${photo}-${index}`}
            style={styles.photoSlot}
            onLongPress={() => removePhoto(index)}>
            <Camera size={20} color={theme.orange400} />
            <Text style={styles.photoLabel}>{photo}</Text>
          </Pressable>
        ))}
        {photos.length < MAX_PHOTOS ? (
          <Pressable
            style={[styles.photoSlot, styles.photoAdd]}
            onPress={addPhoto}>
            <Text style={styles.photoAddText}>+ Agregar</Text>
          </Pressable>
        ) : null}
      </View>

      <Text style={styles.sectionTitle}>HORARIOS</Text>
      {schedule.map((entry, index) => (
        <View key={entry.day} style={styles.dayRow}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayLabel}>{entry.day.toUpperCase()}</Text>
            <View style={styles.closedToggle}>
              <Text style={styles.closedLabel}>Cerrado</Text>
              <Switch
                value={entry.closed}
                onValueChange={(closed) => updateDay(index, { closed })}
                trackColor={{ false: theme.border, true: theme.orange500 }}
                thumbColor={theme.white}
              />
            </View>
          </View>
          {!entry.closed ? (
            <View style={styles.hoursRow}>
              <RecordField
                label="APERTURA"
                value={entry.open}
                onChangeText={(open) => updateDay(index, { open })}
                placeholder="09:00"
                style={styles.hourInput}
              />
              <RecordField
                label="CIERRE"
                value={entry.close}
                onChangeText={(close) => updateDay(index, { close })}
                placeholder="18:00"
                style={styles.hourInput}
              />
            </View>
          ) : null}
        </View>
      ))}

      <Text style={styles.sectionTitle}>VACACIONES</Text>
      <View style={styles.vacationRow}>
        <View style={styles.vacationCopy}>
          <Text style={styles.vacationTitle}>Cerrado por vacaciones</Text>
          <Text style={styles.hint}>Los clientes verán que no estás atendiendo temporalmente.</Text>
        </View>
        <Switch
          value={onVacation}
          onValueChange={setOnVacation}
          trackColor={{ false: theme.border, true: theme.orange500 }}
          thumbColor={theme.white}
        />
      </View>
      {onVacation ? (
        <RecordField
          label="NOTA (OPCIONAL)"
          value={vacationNote}
          onChangeText={setVacationNote}
          placeholder="Ej. Volvemos el 15 de agosto"
        />
      ) : null}
    </RecordScreenShell>
  );
}

function createStyles(theme: MotoTrackTheme) {
  return StyleSheet.create({
    sectionTitle: {
      fontSize: 10,
      fontFamily: 'monospace',
      letterSpacing: 1.5,
      color: theme.orange400,
      marginTop: 4,
    },
    hint: {
      fontSize: 11,
      color: theme.textTertiary,
      lineHeight: 16,
    },
    photoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    photoSlot: {
      width: '30%',
      aspectRatio: 1,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      padding: 8,
    },
    photoAdd: {
      borderStyle: 'dashed',
    },
    photoLabel: {
      fontSize: 9,
      fontFamily: 'monospace',
      color: theme.textMuted,
      textAlign: 'center',
    },
    photoAddText: {
      fontSize: 11,
      color: theme.orange400,
      fontWeight: '600',
    },
    dayRow: {
      gap: 8,
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
    },
    dayHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dayLabel: {
      fontSize: 10,
      fontFamily: 'monospace',
      letterSpacing: 1,
      color: theme.textSecondary,
    },
    closedToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    closedLabel: {
      fontSize: 11,
      color: theme.textMuted,
    },
    hoursRow: {
      flexDirection: 'row',
      gap: 10,
    },
    hourInput: {
      flex: 1,
    },
    vacationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      padding: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surface,
    },
    vacationCopy: {
      flex: 1,
      gap: 4,
    },
    vacationTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
    },
  });
}
