import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HabitListProps {
  habits: string[];
  onDeleteHabit?: (habitId: number) => void;
  onAddHabit?: () => void;
}

export default function HabitList({
  habits,
  onDeleteHabit,
  onAddHabit,
}: HabitListProps) {
  return (
    <View style={habitStyles.container}>
      <View style={habitStyles.headerRow}>
        <View style={habitStyles.titleContainer}>
          <Ionicons name="repeat" size={22} color={COLORS.primary} />
          <Text style={habitStyles.sectionTitle}>Daily Habits</Text>
        </View>
        {onAddHabit && (
          <TouchableOpacity
            style={habitStyles.addIconButton}
            onPress={onAddHabit}
          >
            <Ionicons name="add-circle" size={28} color={COLORS.success} />
          </TouchableOpacity>
        )}
      </View>

      {!habits || habits.length === 0 ? (
        <View style={habitStyles.emptyState}>
          <Ionicons name="leaf-outline" size={48} color={COLORS.grayLight} />
          <Text style={habitStyles.emptyText}>No habits added yet</Text>
          <Text style={habitStyles.emptySubtext}>
            Build consistency with daily habits
          </Text>
          {onAddHabit && (
            <TouchableOpacity
              style={habitStyles.emptyAddButton}
              onPress={onAddHabit}
            >
              <Ionicons name="add" size={18} color={COLORS.white} />
              <Text style={habitStyles.emptyAddButtonText}>Add Habit</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <>
          {habits.map((habit, index) => (
            <View key={index} style={habitStyles.habitCard}>
              <View style={habitStyles.habitIcon}>
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={COLORS.success}
                />
              </View>
              <Text style={habitStyles.habitText}>{habit}</Text>
              {onDeleteHabit && (
                <TouchableOpacity
                  style={habitStyles.deleteButton}
                  onPress={() => onDeleteHabit(index)}
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
          <View style={habitStyles.footer}>
            <Text style={habitStyles.countText}>
              {habits.length} {habits.length === 1 ? "habit" : "habits"} to
              build
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

const habitStyles = StyleSheet.create({
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
    backgroundColor: COLORS.primary,
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
  habitCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8faf8",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
  },
  habitIcon: {
    marginRight: 12,
  },
  habitText: {
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
  countText: {
    fontSize: 13,
    color: COLORS.gray,
    fontWeight: "500",
  },
});
