import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface GoalsListProps {
  goals: string[];
  onToggleGoal?: (goalId: number) => void;
  onDeleteGoal?: (goalId: number) => void;
  onAddGoal?: () => void;
}

export default function GoalList({
  goals,
  onDeleteGoal,
  onAddGoal,
}: GoalsListProps) {
  return (
    <View style={goalStyles.container}>
      <View style={goalStyles.headerRow}>
        <View style={goalStyles.titleContainer}>
          <Ionicons name="flag" size={22} color={COLORS.warning} />
          <Text style={goalStyles.sectionTitle}>Goals</Text>
        </View>
        {onAddGoal && (
          <TouchableOpacity
            style={goalStyles.addIconButton}
            onPress={onAddGoal}
          >
            <Ionicons name="add-circle" size={28} color={COLORS.success} />
          </TouchableOpacity>
        )}
      </View>

      {!goals || goals.length === 0 ? (
        <View style={goalStyles.emptyState}>
          <Ionicons name="ribbon-outline" size={48} color={COLORS.grayLight} />
          <Text style={goalStyles.emptyText}>No goals set yet</Text>
          <Text style={goalStyles.emptySubtext}>
            Set targets to work towards
          </Text>
          {onAddGoal && (
            <TouchableOpacity
              style={goalStyles.emptyAddButton}
              onPress={onAddGoal}
            >
              <Ionicons name="add" size={18} color={COLORS.white} />
              <Text style={goalStyles.emptyAddButtonText}>Add Goal</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <>
          {goals.map((goal, index) => (
            <View key={index} style={goalStyles.goalCard}>
              <View style={goalStyles.goalNumber}>
                <Text style={goalStyles.goalNumberText}>{index + 1}</Text>
              </View>
              <Text style={goalStyles.goalText}>{goal}</Text>
              {onDeleteGoal && (
                <TouchableOpacity
                  style={goalStyles.deleteButton}
                  onPress={() => onDeleteGoal(index)}
                >
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color={COLORS.error}
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
          <View style={goalStyles.footer}>
            <View style={goalStyles.progressIndicator}>
              <Ionicons name="trending-up" size={16} color={COLORS.success} />
              <Text style={goalStyles.countText}>
                {goals.length} {goals.length === 1 ? "goal" : "goals"} to
                achieve
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const goalStyles = StyleSheet.create({
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primaryDark,
  },
  addIconButton: {
    padding: 4,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 24,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 12,
    fontWeight: "500",
  },
  emptySubtext: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 4,
  },
  emptyAddButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.warning,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    marginTop: 16,
    gap: 6,
  },
  emptyAddButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
  goalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fffbf5",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  goalNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.warning,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  goalNumberText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
  },
  goalText: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  footer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  progressIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  countText: {
    fontSize: 13,
    color: COLORS.gray,
    fontWeight: "500",
  },
});
