import { MapPin } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { DEFAULT_MAP_CENTER } from '@/constants/workshop';
import type { MotoTrackTheme } from '@/constants/mototrack-theme';
import { useMotoTrackTheme } from '@/contexts/theme-mode-context';

type WorkshopMapPickerProps = {
  latitude: number;
  longitude: number;
  onChange: (coords: { latitude: number; longitude: number }) => void;
};

const MAP_SPAN = 0.02;

function coordsToPosition(lat: number, lng: number) {
  const x = ((lng - (DEFAULT_MAP_CENTER.longitude - MAP_SPAN)) / (MAP_SPAN * 2)) * 100;
  const y = ((DEFAULT_MAP_CENTER.latitude + MAP_SPAN - lat) / (MAP_SPAN * 2)) * 100;
  return {
    x: Math.min(92, Math.max(8, x)),
    y: Math.min(88, Math.max(12, y)),
  };
}

function positionToCoords(xPercent: number, yPercent: number) {
  const longitude = DEFAULT_MAP_CENTER.longitude - MAP_SPAN + (xPercent / 100) * MAP_SPAN * 2;
  const latitude = DEFAULT_MAP_CENTER.latitude + MAP_SPAN - (yPercent / 100) * MAP_SPAN * 2;
  return { latitude, longitude };
}

export function WorkshopMapPicker({ latitude, longitude, onChange }: WorkshopMapPickerProps) {
  const { theme } = useMotoTrackTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [mapSize, setMapSize] = useState({ width: 320, height: 180 });
  const pin = coordsToPosition(latitude, longitude);

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>UBICACIÓN EN MAPA</Text>
      <Text style={styles.hint}>
        Toca el mapa para marcar la ubicación exacta de tu taller. Así te encontrarán motociclistas
        cercanos.
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
        <View style={styles.gridH1} />
        <View style={styles.gridH2} />
        <View style={styles.gridV1} />
        <View style={styles.gridV2} />
        <View style={[styles.pin, { left: `${pin.x}%`, top: `${pin.y}%` }]}>
          <MapPin size={22} color={theme.orange500} fill={theme.orange500} />
        </View>
      </Pressable>
      <Text style={styles.coords}>
        {latitude.toFixed(5)}, {longitude.toFixed(5)}
      </Text>
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
    hint: {
      fontSize: 11,
      color: theme.textTertiary,
      lineHeight: 16,
    },
    map: {
      height: 180,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.surfaceMuted,
      overflow: 'hidden',
      position: 'relative',
    },
    gridH1: {
      position: 'absolute',
      top: '33%',
      left: 0,
      right: 0,
      height: 1,
      backgroundColor: theme.border,
      opacity: 0.5,
    },
    gridH2: {
      position: 'absolute',
      top: '66%',
      left: 0,
      right: 0,
      height: 1,
      backgroundColor: theme.border,
      opacity: 0.5,
    },
    gridV1: {
      position: 'absolute',
      left: '33%',
      top: 0,
      bottom: 0,
      width: 1,
      backgroundColor: theme.border,
      opacity: 0.5,
    },
    gridV2: {
      position: 'absolute',
      left: '66%',
      top: 0,
      bottom: 0,
      width: 1,
      backgroundColor: theme.border,
      opacity: 0.5,
    },
    pin: {
      position: 'absolute',
      marginLeft: -11,
      marginTop: -22,
    },
    coords: {
      fontSize: 10,
      fontFamily: 'monospace',
      color: theme.textMuted,
    },
  });
}
