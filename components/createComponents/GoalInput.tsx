import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/styles";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

interface GoalInputProps {
  goals: { id: string; value: string }[];
  setGoals: (value: { id: string; value: string }[]) => void;
}

export default function GoalInput({ goals, setGoals }: GoalInputProps) {
  const [goalInput, setGoalInput] = useState("");

  const addGoal = () => {
    if (!goalInput.trim()) {
      Alert.alert("Empty Goal", "Please enter a goal.");
      return;
    }

    setGoals([...goals, { id: Math.random().toString(), value: goalInput }]);
    setGoalInput("");
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
        Add Goals for Your Hobby to Boost XP when you achieve them!
      </Text>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <TextInput
          style={[styles.input, { flex: 1, height: 48 }]}
          placeholder="e.g. Practice 3x weekly"
          placeholderTextColor="#999"
          value={goalInput}
          onChangeText={setGoalInput}
        />
        <TouchableOpacity
          onPress={addGoal}
          style={{
            backgroundColor: COLORS.primary,
            borderRadius: 8,
            paddingHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Add</Text>
        </TouchableOpacity>
      </View>

      {goals.length > 0 ? (
        <View style={{ marginTop: 16, gap: 10 }}>
          {goals.map((item, index) => (
            <View
              key={item.id}
              style={{
                backgroundColor: "#f8f9fa",
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#e0e0e0",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ flex: 1, fontSize: 15, color: COLORS.black }}>
                {index + 1}. {item.value}
              </Text>

              <TouchableOpacity
                onPress={() => deleteGoal(item.id)}
                style={{
                  backgroundColor: "#ff4444",
                  borderRadius: 6,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <View
          style={{
            marginTop: 16,
            padding: 20,
            backgroundColor: "#f8f9fa",
            borderRadius: 8,
            borderWidth: 1,
            borderStyle: "dashed",
            borderColor: "#e0e0e0",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#999" }}>No goals yet—add one above.</Text>
        </View>
      )}
    </View>
  );
}
