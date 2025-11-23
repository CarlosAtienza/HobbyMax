import { COLORS } from '@/constants/theme';
import { styles } from '@/styles/styles';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface HabitInputProps {
  habits: string[];
  setHabits: (value: string[]) => void;
}

export default function HabitInput({ habits, setHabits }: HabitInputProps) {
  const [habitInput, setHabitInput] = useState("");

  const addHabit = () => {
    if (!habitInput.trim()) {
      Alert.alert("Empty Habit", "Please enter a habit.");
      return;
    }

    setHabits([...habits, habitInput]);
    setHabitInput("");
  };

  const deleteHabit = (index: number) => {
    const updated = habits.filter((_, i) => i !== index);
    setHabits(updated);
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
        Add Habits for Your Hobby to Stay Consistent!
      </Text>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <TextInput
          style={[styles.input, { flex: 1, height: 48 }]}
          placeholder="e.g., Meditate daily"
          placeholderTextColor="#999"
          value={habitInput}
          onChangeText={setHabitInput}
        />
        <TouchableOpacity
          onPress={addHabit}
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

      {habits.length > 0 ? (
        <View style={{ marginTop: 16, gap: 10 }}>
          {habits.map((habit, index) => (
            <View
              key={index}
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
              <Text style={{ fontSize: 15, color: COLORS.black }}>
                {habit}
              </Text>

              <TouchableOpacity
                onPress={() => deleteHabit(index)}
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
          <Text style={{ color: "#999" }}>No habits yet—add one above.</Text>
        </View>
      )}
    </View>
  );
}
