import { COLORS } from "@/constants/theme";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface XpBarProps {
  currentXp: number;
  level: number;
  xpNeededToLevelUp?: number;
}

const DEFAULT_XP_PER_LEVEL = 100;

export default function XpBar({
  currentXp,
  level,
  xpNeededToLevelUp,
}: XpBarProps) {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  // Use dynamic xpNeededToLevelUp from backend (supports 2.25x scaling)
  // currentXp from backend is already the XP progress toward next level (not cumulative)
  const xpRequired = xpNeededToLevelUp ?? DEFAULT_XP_PER_LEVEL;
  const xpInCurrentLevel = currentXp;
  const progressPercent = Math.min((xpInCurrentLevel / xpRequired) * 100, 100);

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progressPercent,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [animatedWidth, progressPercent]);

  const animatedWidthStyle = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={xpBarStyles.container}>
      <View style={xpBarStyles.header}>
        <View style={xpBarStyles.levelContainer}>
          <Ionicons name="star" size={18} color={COLORS.warning} />
          <Text style={xpBarStyles.levelText}>Level {level}</Text>
        </View>
        <Text style={xpBarStyles.xpText}>
          {xpInCurrentLevel} / {xpRequired} XP
        </Text>
      </View>

      <View style={xpBarStyles.barBackground}>
        <Animated.View
          style={[xpBarStyles.barFill, { width: animatedWidthStyle }]}
        />
      </View>

      <Text style={xpBarStyles.nextLevelText}>
        {xpRequired - xpInCurrentLevel} XP to Level {level + 1}
      </Text>
    </View>
  );
}

const xpBarStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  levelText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primaryDark,
  },
  xpText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.gray,
  },
  barBackground: {
    height: 12,
    backgroundColor: COLORS.grayLight,
    borderRadius: 6,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  nextLevelText: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 8,
    textAlign: "center",
  },
});
