import Svg, { Circle, Ellipse, Line, Path, Rect } from 'react-native-svg';

type MotorcycleSVGProps = {
  width?: number | string;
  height?: number | string;
  color?: string;
};

const rSpokes = [0, 30, 60, 90, 120, 150];

export function MotorcycleSVG({
  width = '100%',
  height,
  color = 'currentColor',
}: MotorcycleSVGProps) {
  return (
    <Svg
      viewBox="0 0 800 420"
      width={width}
      height={height}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round">
      <Circle cx="190" cy="315" r="86" strokeWidth="2.5" />
      <Circle cx="190" cy="315" r="58" strokeWidth="1" strokeOpacity="0.3" />
      <Circle cx="190" cy="315" r="13" strokeWidth="2" />
      {rSpokes.map((a) => (
        <Line
          key={`rs${a}`}
          x1={190 + 13 * Math.cos((a * Math.PI) / 180)}
          y1={315 + 13 * Math.sin((a * Math.PI) / 180)}
          x2={190 + 58 * Math.cos((a * Math.PI) / 180)}
          y2={315 + 58 * Math.sin((a * Math.PI) / 180)}
          strokeWidth="1"
          strokeOpacity="0.25"
        />
      ))}

      <Circle cx="612" cy="315" r="86" strokeWidth="2.5" />
      <Circle cx="612" cy="315" r="58" strokeWidth="1" strokeOpacity="0.3" />
      <Circle cx="612" cy="315" r="13" strokeWidth="2" />
      {rSpokes.map((a) => (
        <Line
          key={`fs${a}`}
          x1={612 + 13 * Math.cos((a * Math.PI) / 180)}
          y1={315 + 13 * Math.sin((a * Math.PI) / 180)}
          x2={612 + 58 * Math.cos((a * Math.PI) / 180)}
          y2={315 + 58 * Math.sin((a * Math.PI) / 180)}
          strokeWidth="1"
          strokeOpacity="0.25"
        />
      ))}

      <Path d="M190 315 L308 260" strokeWidth="3.5" />
      <Path d="M308 260 L362 158 L446 134 L492 186 L568 207 L612 315" strokeWidth="3.5" />
      <Path d="M308 260 L332 207 L362 158" strokeWidth="2.5" />
      <Path d="M362 158 L404 143 L446 134" strokeWidth="2" strokeOpacity="0.5" />

      <Rect x="310" y="210" width="164" height="94" rx="5" strokeWidth="2.5" />
      <Line x1="310" y1="248" x2="474" y2="248" strokeWidth="1" strokeOpacity="0.35" />
      <Line x1="354" y1="210" x2="354" y2="304" strokeWidth="1" strokeOpacity="0.28" />
      <Line x1="392" y1="210" x2="392" y2="304" strokeWidth="1" strokeOpacity="0.28" />
      <Line x1="432" y1="210" x2="432" y2="304" strokeWidth="1" strokeOpacity="0.28" />

      <Path d="M362 158 Q398 103 490 120 L500 170 L350 174 Z" strokeWidth="2.5" />
      <Path d="M446 134 Q512 110 568 120 L575 144 L442 152 Z" strokeWidth="2" />
      <Path d="M568 120 Q610 114 630 130 L620 152 L568 144 Z" strokeWidth="2" />

      <Path d="M562 190 L592 315" strokeWidth="3.5" />
      <Path d="M549 195 L578 315" strokeWidth="2.5" />
      <Rect x="544" y="183" width="32" height="14" rx="3" strokeWidth="1.5" />

      <Path d="M544 188 L516 158" strokeWidth="2.5" />
      <Path d="M576 188 L600 162" strokeWidth="2.5" />
      <Path d="M510 154 Q508 148 514 144 Q520 140 522 146" strokeWidth="2" />
      <Path d="M604 158 Q608 152 614 154 Q618 158 614 164" strokeWidth="2" />

      <Path d="M550 166 Q596 144 632 174 L624 218 Q597 210 567 200" strokeWidth="2" />
      <Ellipse cx="628" cy="184" rx="21" ry="15" strokeWidth="2" />
      <Ellipse cx="628" cy="184" rx="12" ry="9" strokeWidth="1" strokeOpacity="0.4" />

      <Path
        d="M320 292 Q378 306 432 300 Q484 296 514 283 Q536 275 550 268"
        strokeWidth="2.5"
      />
      <Path d="M516 158 L496 140 L503 153 Z" strokeWidth="1.5" />

      <Path
        d="M190 315 Q250 302 310 294"
        strokeWidth="1.5"
        strokeOpacity="0.45"
        strokeDasharray="5 3"
      />

      <Circle cx="190" cy="315" r="30" strokeWidth="1" strokeOpacity="0.2" />
      <Circle cx="612" cy="315" r="30" strokeWidth="1" strokeOpacity="0.2" />
    </Svg>
  );
}
