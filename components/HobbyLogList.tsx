import { HobbyLogResponseDTO } from '@/models/api'
import { useAuthStore } from '@/stores/authStore'
import { styles } from '@/styles/styles'
import React from 'react'
import { Alert, Button, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { axiosInstance } from '../lib/axios'


interface HobbyLogListProps {
  logs: HobbyLogResponseDTO[];
  hobbyId: number;
}

export default function HobbyLogList({ logs, hobbyId }: HobbyLogListProps) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newDescription, setNewDescription] = React.useState('');
  const { token } = useAuthStore();
  const [localLogs, setLocalLogs] = React.useState<HobbyLogResponseDTO[]>(logs);

  const handleCreateLog = async () => {
    if (newDescription) {
      try {
        const formData = new FormData();
        formData.append("description", newDescription);
        formData.append("hobbyId", hobbyId.toString());
      
      
      const response = await axiosInstance.post('/hobby-logs', formData, {
        headers: { 'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
         },
      })

      Alert.alert("Success", "Hobby Log added!");
      setLocalLogs([...localLogs, response.data]);
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
        data={[{ id: 'create-card', description: '', title: '' }, ...localLogs]}
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

      {/* Modal for creating a new log */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>New Hobby Log</Text>
            <TextInput
              placeholder="Description"
              value={newDescription}
              onChangeText={setNewDescription}
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <Button title="Create" onPress={handleCreateLog} />
            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}