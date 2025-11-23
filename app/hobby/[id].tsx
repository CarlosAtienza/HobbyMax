import AddGoalModal from '@/components/AddGoalModal';
import GoalsList from '@/components/GoalList';
import HobbyLogList from '@/components/HobbyLogList';
import { HobbyResponseDTO } from '@/models/api';
import { useAuthStore } from '@/stores/authStore';
import { useHobbyLogStore } from '@/stores/hobbyLogStore';
import { useHobbyStore } from '@/stores/hobbyStore';

import { COLORS } from '@/constants/theme';
import { styles } from '@/styles/styles';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';


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

  }

  const handleToggleGoal = (goalId: number) => {

  }


 



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
       {hobby?.goals && (
        <GoalsList 
          goals={hobby.goals} 
          onToggleGoal={handleToggleGoal}
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