import { styles } from '@/styles/styles';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


interface GoalsListProps {
  goals: string[];
  onToggleGoal?: (goalId: number) => void;
  onDeleteGoal?: (goalId: number) => void;
  onAddGoal?: () => void;
}

export default function GoalList({ goals, onDeleteGoal, onAddGoal }: GoalsListProps) {
    if (!goals || goals.length === 0) {
        return (
           <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No goals set yet</Text>
        {onAddGoal && (
          <TouchableOpacity style={styles.addButton} onPress={onAddGoal}>
            <Ionicons name="add-circle" size={20} color="#4CAF50" />
            <Text style={styles.addButtonText}>Add Your First Goal</Text>
          </TouchableOpacity>
        )}
      </View>
        );
    }

    console.log("Rendering GoalList with goals:", goals);

  return (
    <View style={{marginTop: 20}}>
      <Text style={styles.sectionTitle}>Goals</Text>
        {onAddGoal && (
          <TouchableOpacity style={{padding: 4}} onPress={onAddGoal}>
            <Ionicons name="add-circle" size={28} color="#4CAF50" />
          </TouchableOpacity>
        )}
        {goals.map((goal, index) => (
        <View key={index} style={styles.goalItem}>
          <View style={styles.bulletContainer}>
            <View style={styles.bullet} />
          </View>
          <Text style={styles.goalText}>{goal}</Text>
          {onDeleteGoal && (
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => onDeleteGoal(index)}
            >
              <Ionicons name="trash-outline" size={20} color="#ff4444" />
            </TouchableOpacity>
          )}
        </View>
      ))}
      <View style={styles.footer}>
        <Text style={styles.countText}>
          {goals.length} {goals.length === 1 ? 'goal' : 'goals'}
        </Text>
      </View>
    </View> 
  )
}