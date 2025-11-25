import { styles } from '@/styles/styles';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface HabitListProps {
  habits: string[];
  onDeleteHabit?: (habitId: number) => void;
  onAddHabit?: () => void;
}

export default function HabitList({ habits, onDeleteHabit, onAddHabit }: HabitListProps) {
  if (!habits || habits.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No habits added yet</Text>

        {onAddHabit && (
          <TouchableOpacity style={styles.addButton} onPress={onAddHabit}>
            <Ionicons name="add-circle" size={20} color="#4CAF50" />
            <Text style={styles.addButtonText}>Add Your First Habit</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.sectionTitle}>Habits</Text>

      {onAddHabit && (
        <TouchableOpacity style={{ padding: 4 }} onPress={onAddHabit}>
          <Ionicons name="add-circle" size={28} color="#4CAF50" />
        </TouchableOpacity>
      )}

      {habits.map((habit, index) => (
        <View key={index} style={styles.goalItem}>
          <View style={styles.bulletContainer}>
            <View style={styles.bullet} />
          </View>

          <Text style={styles.goalText}>{habit}</Text>

          {onDeleteHabit && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDeleteHabit(index)}
            >
              <Ionicons name="trash-outline" size={20} color="#ff4444" />
            </TouchableOpacity>
          )}
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.countText}>
          {habits.length} {habits.length === 1 ? 'habit' : 'habits'}
        </Text>
      </View>
    </View>
  );
}