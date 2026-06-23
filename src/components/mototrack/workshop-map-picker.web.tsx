import { MapPin } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { DEFAULT_MAP_CENTER } from '@/constants/workshop';
import { AuthColors } from '@/constants/auth-theme';
import { Fonts } from '@/constants/theme';

type WorkshopMapPickerWebProps = {
  latitude: number;
  longitude: number;
  onChange: (coords: { latitude: number; longitude: number }) => void;
};

const MAP_SPAN = 0.04;

function coordsToPosition(lat: number, lng: number) {
  const x = ((lng - (DEFAULT_MAP_CENTER.longitude - MAP_SPAN)) / (MAP_SPAN * 2)) * 100;
  const y = ((DEFAULT_MAP_CENTER.latitude + MAP_SPAN - lat) / (MAP_SPAN * 2)) * 100;
  return {
    x: Math.min(94, Math.max(6, x)),
    y: Math.min(90, Math.max(10, y)),
  };
}

function positionToCoords(xPercent: number, yPercent: number) {
  const longitude = DEFAULT_MAP_CENTER.longitude - MAP_SPAN + (xPercent / 100) * MAP_SPAN * 2;
  const latitude = DEFAULT_MAP_CENTER.latitude + MAP_SPAN - (yPercent / 100) * MAP_SPAN * 2;
  return { latitude, longitude };
}

export function WorkshopMapPickerWeb({ latitude, longitude, onChange }: WorkshopMapPickerWebProps) {
  const [mapSize, setMapSize] = useState({ width: 640, height: 280 });
  const pin = coordsToPosition(latitude, longitude);

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>UBICACIÓN EN EL MAPA</Text>
      <Text style={styles.hint}>
        Haz clic en el mapa para fijar la ubicación exacta. Los motociclistas te encontrarán en
        “talleres cercanos”.
      </Text>
      <Pressable
        style={styles.map}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setMapSize({ width, height });
        }}
        onPress={(event) => {
          const xPercent = (event.nativeEvent.locationX / mapSize.width) * 100;
          const yPercent = (event.nativeEvent.locationY / mapSize.height) * 100;
          onChange(positionToCoords(xPercent, yPercent));
        }}>
        <View style={styles.mapGrid}>
          {Array.from({ length: 5 }).map((_, i) => (
            <View key={`h-${i}`} style={[styles.gridLineH, { top: `${(i + 1) * 16.66}%` }]} />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <View key={`v-${i}`} style={[styles.gridLineV, { left: `${(i + 1) * 16.66}%` }]} />
          ))}
        </View>
        <View style={[styles.pin, { left: `${pin.x}%`, top: `${pin.y}%` }]}>
          <MapPin size={28} color={AuthColors.text} fill={AuthColors.text} />
        </View>
      </Pressable>
      <View style={styles.coordsRow}>
        <View style={styles.coordField}>
          <Text style={styles.coordLabel}>LATITUD</Text>
          <TextInput
            value={latitude.toFixed(5)}
            editable={false}
            style={styles.coordInput}
          />
        </View>
        <View style={styles.coordField}>
          <Text style={styles.coordLabel}>LONGITUD</Text>
          <TextInput
            value={longitude.toFixed(5)}
            editable={false}
            style={styles.coordInput}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 10,
  },
  label: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    letterSpacing: 1.2,
    color: AuthColors.textMuted,
  },
  hint: {
    fontSize: 13,
    lineHeight: 19,
    color: AuthColors.textMuted,
  },
  map: {
    height: 280,
    borderWidth: 1,
    borderColor: AuthColors.border,
    backgroundColor: '#e8e6df',
    overflow: 'hidden',
    position: 'relative',
  },
  mapGrid: {
    ...StyleSheet.absoluteFillObject,
  },
  gridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(9, 9, 11, 0.08)',
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(9, 9, 11, 0.08)',
  },
  pin: {
    position: 'absolute',
    marginLeft: -14,
    marginTop: -28,
  },
  coordsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  coordField: {
    flex: 1,
    gap: 6,
  },
  coordLabel: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    letterSpacing: 1,
    color: AuthColors.textFaint,
  },
  coordInput: {
    backgroundColor: AuthColors.surface,
    borderWidth: 1,
    borderColor: AuthColors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    fontFamily: Fonts.mono,
    color: AuthColors.textMuted,
  },
});
