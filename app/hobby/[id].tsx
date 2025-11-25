import AddGoalModal from '@/components/AddGoalModal';
import GoalsList from '@/components/HobbyId/GoalList';
import HabitList from '@/components/HobbyId/HabitList';
import HobbyLogList from '@/components/HobbyLogList';
import { HobbyResponseDTO } from '@/models/api';
import { useAuthStore } from '@/stores/authStore';
import { useHobbyLogStore } from '@/stores/hobbyLogStore';
import { useHobbyStore } from '@/stores/hobbyStore';

import { COLORS } from '@/constants/theme';
import { axiosInstance } from '@/lib/axios';
import { styles } from '@/styles/styles';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';

export default function HobbyDetails() {
  
  const {id: idRaw } = useLocalSearchParams();
  const {hobbyData} = useLocalSearchParams();
  const id = Array.isArray(idRaw) ? idRaw[0] : idRaw ?? '';
  const {fetchHobbyLogs} = useHobbyLogStore();
  const { token } = useAuthStore();
  const { hobbies } = useHobbyStore();
  const [showAddGoalModal, setShowAddGoalModal] = React.useState(false);


  useEffect(() => {
    const hobbyId = Number(id);

    fetchHobbyLogs(hobbyId, token!);

  }, [id, token, hobbies]);

  const hobby: HobbyResponseDTO | undefined = useMemo(() => {
    if (hobbyData){
      const dataString = Array.isArray(hobbyData) ? hobbyData[0] : hobbyData;
      return JSON.parse(dataString) as HobbyResponseDTO;
    }
    else {
      return hobbies.find(hobby => hobby.id === Number(id));
    }
  }, [hobbies, id, hobbyData]);


  const handleAddGoal = async (description: string) => {
    try {
      if (description.trim() === '') {
        Alert.alert('Validation Error', 'Goal description cannot be empty.');
        return;
      }
      const response = await axiosInstance.put(`/hobbies/add-goal/${id}`, description, {
        headers: {
          'Content-Type': "text/plain", Authorization: `Bearer ${token}`
        },
      });
      Alert.alert('Success', 'Goal added successfully!');
    } catch (error) {
      console.error('Error adding goal:', error);
      Alert.alert('Error', 'There was an error adding the goal. Please try again.');
    }
  }

  const handleAddHabit = async (description: string) => {
    try {
      if (description.trim() === '') {
        Alert.alert('Validation Error', 'Habit description cannot be empty.');
        return;
      }
      const response = await axiosInstance.put(`/hobbies/add-habit/${id}`, description, {
        headers: {
          'Content-Type': "text/plain", Authorization: `Bearer ${token}`
        },
      });
      Alert.alert('Success', 'Habit added successfully!');
    } catch (error) {
      console.error('Error adding habbit:', error);
      Alert.alert('Error', 'There was an error adding the habit. Please try again.');
    }
  }


 //TODO: DELETE HABIT FUNCTION and GOAL FUNCTION



  return (
    <ScrollView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={hobbyStyles.hobbyHeaderSection}>
        <View style={hobbyStyles.hobbyHeaderImageContainer}>
        <Image
          source={
                  hobby?.hobbyImage ? 
                  { uri: hobby?.hobbyImage } : 
                  require('@/assets/images/hobbyImagePlaceHolder.png')
                }
          style={styles.hobbyHeaderImage}
        />
        </View>
      
      </View>
      {hobby?.habits && (
        <HabitList
          habits={hobby?.habits ?? []}
          onAddHabit={() => setShowAddGoalModal(true)}  
          //onDeleteHabit={handleDeleteHabit}
        />

      )}

       {hobby?.goals && (
        <GoalsList 
          goals={hobby.goals} 
          onAddGoal={() => setShowAddGoalModal(true)}
        />
      )}
      <HobbyLogList hobbyId={Number(id)} />

       <AddGoalModal
        visible={showAddGoalModal}
        onClose={() => setShowAddGoalModal(false)}
        onSubmit={handleAddGoal}
      />
    </ScrollView>
  )
}

export const hobbyStyles = StyleSheet.create({
  hobbyHeaderSection: {
    width: '100%',
    height: 250,
    backgroundColor: '#f5f5f5',
    marginBottom: 16,
    overflow: 'hidden',
  },
  hobbyHeaderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  hobbyHeaderImageContainer: {
    width: '100%',
    height: '100%',
    marginBottom: 16,
    marginTop: 16,
    overflow: 'hidden',
    margin: 12,
  },
});