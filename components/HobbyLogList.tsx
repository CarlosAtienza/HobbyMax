import { useAuthStore } from '@/stores/authStore'
import { useHobbyLogStore } from '@/stores/hobbyLogStore'
import { useHobbyStore } from '@/stores/hobbyStore'
import { styles } from '@/styles/styles'
import React from 'react'
import { Alert, Button, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { axiosInstance } from '../lib/axios'


interface HobbyLogListProps {
  hobbyId: number;
}

export default function HobbyLogList({ hobbyId }: HobbyLogListProps) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newDescription, setNewDescription] = React.useState('');
  const { token } = useAuthStore();
  const {hobbies, setHobbies} = useHobbyStore();
  const {hobbyLogs, setHobbyLogs} = useHobbyLogStore();

 
  

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
      setHobbies(updatedHobbies);


      setModalVisible(false);
      setNewDescription('');

    } catch (err) {
        console.error("Error creating hobby log:", err);
      }
  }
}




   return (
    <View>
      <FlatList
        data={[{ id: 'create-card', description: '', title: '' }, ...hobbyLogs]}
        ListEmptyComponent={<Text>No Logs Created</Text>}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        
        renderItem={({ item }) => {
          if (item.id === 'create-card') {
            return (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={[styles.hobbyCard, { justifyContent: 'center', alignItems: 'center' }]}>
                  <Text style={styles.hobbyName}>+ Create New Log</Text>
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <View style={styles.hobbyCard}>
              <Text style={styles.hobbyName}>{item.description}</Text>
              <Text>{item.description}</Text>
            </View>
          );
        }}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.sectionTitleBlack}>New Hobby Log</Text>
            <TextInput
              placeholder="Description"
              value={newDescription}
              onChangeText={setNewDescription}
              style={styles.descriptionInput}
              numberOfLines={5}
              multiline={true}
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