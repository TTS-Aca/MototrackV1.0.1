import { MobileDashboard } from '@/components/mototrack/mobile-dashboard';
import { MotoTrackColors } from '@/constants/mototrack-colors';
import { StyleSheet, View } from 'react-native';

type PhoneFrameProps = {
  scale?: number;
};

export function PhoneFrame({ scale = 1 }: PhoneFrameProps) {
  const w = 280 * scale;
  const h = 580 * scale;
  const r = 40 * scale;

  return (
    <View style={[styles.frame, { width: w, height: h }]}>
      <View style={[styles.shell, { borderRadius: r }]} />
      <View
        style={[
          styles.screen,
          {
            top: 6 * scale,
            left: 6 * scale,
            right: 6 * scale,
            bottom: 6 * scale,
            borderRadius: r - 4,
          },
        ]}>
        <View
          style={[
            styles.dynamicIsland,
            {
              width: 76 * scale,
              height: 14 * scale,
            },
          ]}
        />
        <View style={styles.screenContent}>
          <MobileDashboard />
        </View>
      </View>
      <View style={[styles.volumeBtn, { top: 80 * scale, height: 36 * scale }]} />
      <View style={[styles.volumeBtn, { top: 126 * scale, height: 36 * scale }]} />
      <View style={[styles.powerBtn, { top: 104 * scale, height: 52 * scale }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    position: 'relative',
    alignSelf: 'center',
  },
  shell: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: MotoTrackColors.zinc800,
    borderWidth: 1,
    borderColor: MotoTrackColors.zinc700,
    shadowColor: '#000',
    shadowOpacity: 0.55,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 32 },
  },
  screen: {
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: MotoTrackColors.zinc950,
  },
  dynamicIsland: {
    position: 'absolute',
    top: 12,
    alignSelf: 'center',
    left: '50%',
    marginLeft: -38,
    backgroundColor: MotoTrackColors.zinc950,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: MotoTrackColors.zinc800,
    zIndex: 10,
  },
  screenContent: {
    flex: 1,
    paddingTop: 12,
  },
  volumeBtn: {
    position: 'absolute',
    left: -3,
    width: 3,
    backgroundColor: MotoTrackColors.zinc700,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  powerBtn: {
    position: 'absolute',
    right: -3,
    width: 3,
    backgroundColor: MotoTrackColors.zinc700,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
});
