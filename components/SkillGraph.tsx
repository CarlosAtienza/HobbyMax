import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, {
  Polygon,
  Circle,
  Line,
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
  G,
} from 'react-native-svg';
import { COLORS } from '@/constants/theme';
import { HobbyResponseDTO } from '@/models/api';

interface SkillGraphProps {
  hobbies: HobbyResponseDTO[];
  size?: number;
  maxLevel?: number;
}

export default function SkillGraph({
  hobbies,
  size = 280,
  maxLevel = 100,
}: SkillGraphProps) {
  const center = size / 2;
  const radius = size * 0.35;
  const levels = 5; // Number of concentric rings

  // Limit to 8 hobbies for readability
  const displayHobbies = hobbies.slice(0, 8);
  const numPoints = displayHobbies.length;

  if (numPoints < 3) {
    return (
      <View style={skillStyles.container}>
        <View style={skillStyles.emptyState}>
          <Text style={skillStyles.emptyTitle}>Skill Graph</Text>
          <Text style={skillStyles.emptyText}>
            Add at least 3 hobbies to see your skill radar
          </Text>
        </View>
      </View>
    );
  }

  // Calculate angle for each point
  const angleStep = (2 * Math.PI) / numPoints;
  const startAngle = -Math.PI / 2; // Start from top

  // Get coordinates for a point on the radar
  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep;
    const normalizedValue = Math.min(value / maxLevel, 1);
    const distance = radius * normalizedValue;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
    };
  };

  // Generate concentric rings
  const rings = Array.from({ length: levels }, (_, i) => {
    const ringRadius = (radius / levels) * (i + 1);
    const points = Array.from({ length: numPoints }, (_, j) => {
      const angle = startAngle + j * angleStep;
      return `${center + ringRadius * Math.cos(angle)},${center + ringRadius * Math.sin(angle)}`;
    }).join(' ');
    return points;
  });

  // Generate skill polygon points
  const skillPoints = displayHobbies
    .map((hobby, i) => {
      const point = getPoint(i, hobby.level || 0);
      return `${point.x},${point.y}`;
    })
    .join(' ');

  // Generate axis lines
  const axisLines = displayHobbies.map((_, i) => {
    const angle = startAngle + i * angleStep;
    return {
      x2: center + radius * Math.cos(angle),
      y2: center + radius * Math.sin(angle),
    };
  });

  // Truncate hobby name for display
  const truncateName = (name: string | undefined, maxLength: number = 8) => {
    if (!name) return '???';
    return name.length > maxLength ? name.substring(0, maxLength) + '..' : name;
  };

  return (
    <View style={skillStyles.container}>
      <Text style={skillStyles.title}>Skill Radar</Text>
      <View style={skillStyles.graphContainer}>
        <Svg width={size} height={size}>
          <Defs>
            <LinearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.8" />
              <Stop offset="50%" stopColor={COLORS.accent} stopOpacity="0.6" />
              <Stop offset="100%" stopColor={COLORS.success} stopOpacity="0.4" />
            </LinearGradient>
            <LinearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={COLORS.primary} />
              <Stop offset="100%" stopColor={COLORS.accent} />
            </LinearGradient>
          </Defs>

          {/* Background rings */}
          {rings.map((points, i) => (
            <Polygon
              key={`ring-${i}`}
              points={points}
              fill="none"
              stroke={COLORS.grayLight}
              strokeWidth={1}
              opacity={0.5 + i * 0.1}
            />
          ))}

          {/* Axis lines */}
          {axisLines.map((line, i) => (
            <Line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={line.x2}
              y2={line.y2}
              stroke={COLORS.grayLight}
              strokeWidth={1}
              opacity={0.6}
            />
          ))}

          {/* Skill polygon (filled area) */}
          <Polygon
            points={skillPoints}
            fill="url(#skillGradient)"
            stroke="url(#strokeGradient)"
            strokeWidth={2.5}
          />

          {/* Skill points (dots) */}
          {displayHobbies.map((hobby, i) => {
            const point = getPoint(i, hobby.level || 0);
            return (
              <G key={`point-${i}`}>
                {/* Outer glow */}
                <Circle
                  cx={point.x}
                  cy={point.y}
                  r={8}
                  fill={COLORS.accent}
                  opacity={0.3}
                />
                {/* Inner dot */}
                <Circle
                  cx={point.x}
                  cy={point.y}
                  r={5}
                  fill={COLORS.white}
                  stroke={COLORS.primary}
                  strokeWidth={2}
                />
              </G>
            );
          })}

          {/* Labels */}
          {displayHobbies.map((hobby, i) => {
            const angle = startAngle + i * angleStep;
            const labelRadius = radius + 30;
            const x = center + labelRadius * Math.cos(angle);
            const y = center + labelRadius * Math.sin(angle);

            // Adjust text anchor based on position
            let textAnchor: 'start' | 'middle' | 'end' = 'middle';
            if (Math.cos(angle) > 0.1) textAnchor = 'start';
            if (Math.cos(angle) < -0.1) textAnchor = 'end';

            return (
              <G key={`label-${i}`}>
                <SvgText
                  x={x}
                  y={y - 6}
                  textAnchor={textAnchor}
                  fontSize={11}
                  fontWeight="600"
                  fill={COLORS.black}
                >
                  {truncateName(hobby.name)}
                </SvgText>
                <SvgText
                  x={x}
                  y={y + 8}
                  textAnchor={textAnchor}
                  fontSize={10}
                  fontWeight="bold"
                  fill={COLORS.primary}
                >
                  Lv.{hobby.level || 0}
                </SvgText>
              </G>
            );
          })}
        </Svg>
      </View>

      {/* Legend */}
      <View style={skillStyles.legend}>
        <View style={skillStyles.legendItem}>
          <View style={[skillStyles.legendDot, { backgroundColor: COLORS.primary }]} />
          <Text style={skillStyles.legendText}>Current Level</Text>
        </View>
        <View style={skillStyles.legendItem}>
          <View style={[skillStyles.legendDot, { backgroundColor: COLORS.grayLight }]} />
          <Text style={skillStyles.legendText}>Max: {maxLevel}</Text>
        </View>
      </View>
    </View>
  );
}

const skillStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    marginHorizontal: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 8,
  },
  graphContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: COLORS.gray,
  },
});
