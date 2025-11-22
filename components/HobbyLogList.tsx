import { useAuthStore } from '@/stores/authStore'
import { useHobbyLogStore } from '@/stores/hobbyLogStore'
import { useHobbyStore } from '@/stores/hobbyStore'
import { styles } from '@/styles/styles'
import Slider from "@react-native-community/slider"
import React from 'react'
import { Alert, Button, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { axiosInstance } from '../lib/axios'


interface HobbyLogListProps {
  hobbyId: number;
}

export default function HobbyLogList({ hobbyId }: HobbyLogListProps) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newDescription, setNewDescription] = React.useState('');
  const { token } = useAuthStore();
  const {hobbies, setHobbies} = useHobbyStore();
  const {hobbyLogs, setHobbyLogs, setWeeklyLogs, weeklyLogs} = useHobbyLogStore();

 
  

  const handleCreateLog = async () => {
    if (newDescription) {
      try {
        const formData = new FormData();
        formData.append("description", newDescription);
        formData.append("hobbyId", hobbyId.toString());
      
      
      const response = await axiosInstance.post('/hobby-logs', formData, {
        headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
         },
      })

      Alert.alert("Success", "Hobby Log added!");

      const updatedHobbies = hobbies.map(hobby => {
        if (hobby.id === hobbyId) {
          return {
            ...hobby,
            logs: [...(hobby.logs ?? []), response.data],
          };
        }
        return hobby;
      });

      //Updating weekly logs
      setWeeklyLogs([...(weeklyLogs), response.data]);

      setHobbies(updatedHobbies);


      setModalVisible(false);
      setNewDescription('');

    } catch (err) {
        console.error("Error creating hobby log:", err);
      }
  }
}




   return (
     <View style={{ paddingBottom: 20 }}>
      {/* Create button */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={[styles.hobbyCard, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={styles.hobbyName}>+ Create New Log</Text>
        </View>
      </TouchableOpacity>

      {/* Render logs directly */}
      {hobbyLogs.length > 0 ? (
        hobbyLogs.map((item, index) => (
          <View key={item.id ?? index} style={styles.hobbyCard}>
            <Text style={styles.hobbyName}>{item.description}</Text>
            <Text>{item.description}</Text>
          </View>
        ))
      ) : (
        <Text>No Logs Created</Text>
      )}

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitleBlack}>New Hobby Log</Text>
            <Slider minimumValue={1} maximumValue={10} />
            <TextInput
              placeholder="Description"
              value={newDescription}
              onChangeText={setNewDescription}
              style={styles.descriptionInput}
              numberOfLines={5}
              multiline
              textAlignVertical='top'
            />
            <Button title="Create" onPress={handleCreateLog} />
            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}