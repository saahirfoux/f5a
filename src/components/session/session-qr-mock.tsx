import { StyleSheet, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import { Spacing } from '@/constants/theme';

export type SessionQrMockProps = {
  size?: number;
};

/** Placeholder QR grid for Storybook — not scannable. */
export function SessionQrMock({ size = 160 }: SessionQrMockProps) {
  const cells = 11;
  const cellSize = size / cells;
  const pattern = [
    '11111110010',
    '10000010010',
    '10111010010',
    '10111010010',
    '10111010010',
    '10000010010',
    '11111110010',
    '00000001101',
    '10101111011',
    '10001000101',
    '11111010111',
  ];

  return (
    <View style={[styles.frame, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Rect x={0} y={0} width={size} height={size} fill="#FFFFFF" />
        {pattern.flatMap((row, rowIndex) =>
          row.split('').flatMap((cell, colIndex) =>
            cell === '1'
              ? [
                  <Rect
                    key={`${rowIndex}-${colIndex}`}
                    x={colIndex * cellSize}
                    y={rowIndex * cellSize}
                    width={cellSize}
                    height={cellSize}
                    fill="#1A1A1F"
                  />,
                ]
              : [],
          ),
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderRadius: Spacing.two,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(26, 26, 31, 0.12)',
  },
});
