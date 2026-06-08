import { VOTE_VALUES, type VoteValue } from '@/constants/fov';

export const ARC_ZONE_HEIGHT = 228;
export const TARGET_SIZE = 56;
const PIVOT_INSET = 18;
const ARC_RADIUS = 132;
/** Vote 1 (far from thumb) → vote 5 (nearest thumb) along ~120° sweep. */
const START_ANGLE_DEG = 128;
const END_ANGLE_DEG = 248;

export type ArcPoint = { x: number; y: number };

export function getThumbArcPositions(
  handedness: 'right' | 'left',
  width: number,
  height: number = ARC_ZONE_HEIGHT,
): Record<VoteValue, ArcPoint> {
  const pivotX = handedness === 'right' ? width - PIVOT_INSET : PIVOT_INSET;
  const pivotY = height - PIVOT_INSET;
  const half = TARGET_SIZE / 2;

  const positions = {} as Record<VoteValue, ArcPoint>;

  VOTE_VALUES.forEach((value, index) => {
    const t = index / (VOTE_VALUES.length - 1);
    const angleDeg = START_ANGLE_DEG + t * (END_ANGLE_DEG - START_ANGLE_DEG);
    const angleRad = (angleDeg * Math.PI) / 180;
    let centerX = pivotX + ARC_RADIUS * Math.cos(angleRad);
    const centerY = pivotY + ARC_RADIUS * Math.sin(angleRad);

    if (handedness === 'left') {
      centerX = width - centerX;
    }

    positions[value] = {
      x: centerX - half,
      y: centerY - half,
    };
  });

  return positions;
}
