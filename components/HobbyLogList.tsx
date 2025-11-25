import { COLORS } from '@/constants/theme'
import { HobbyLogResponseDTO } from '@/models/api/hobbyLogResponseDTO'
import { useAuthStore } from '@/stores/authStore'
import { useHobbyLogStore } from '@/stores/hobbyLogStore'
import { useHobbyStore } from '@/stores/hobbyStore'
import { styles } from '@/styles/styles'
import React from 'react'
import { Button, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { axiosInstance } from '../lib/axios'


interface HobbyLogListProps {
  hobbyId: number;
}

export default function HobbyLogList({ hobbyId }: HobbyLogListProps) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [successModalVisible, setSuccessModalVisible] = React.useState(false);
  const [newDescription, setNewDescription] = React.useState('');
  const { token } = useAuthStore();
  const {hobbies, setHobbies} = useHobbyStore();
  const {hobbyLogs, setHobbyLogs, setWeeklyLogs, weeklyLogs} = useHobbyLogStore();
  const [logResponse, setLogResponse] = React.useState<HobbyLogResponseDTO | null>(null);
  

 
  

  const handleCreateLog = async () => {
    if (newDescription) {
      try {
        const formData = new FormData();
        formData.append("description", newDescription);
        formData.append("hobbyId", hobbyId.toString());
      
      
      const response = await axiosInstance.post('/hobby-logs/create', formData, {
        headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
         },
      })

     
      setLogResponse(response.data);

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

      //Close create Modal and open success modal
      setModalVisible(false);
      setSuccessModalVisible(true);
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

      {/* Success Modal */}
      <Modal visible={successModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={[styles.sectionTitleBlack, { fontSize: 24, marginBottom: 20 }]}>
              🎉 Success!
            </Text>
            
            {logResponse && (
              <>
                {logResponse.message && (
                  <Text style={styles.successMessage}>{logResponse.message}</Text>
                )}
                
                <View style={{ marginVertical: 15 }}>
                  <Text style={styles.xpText}>
                    +{logResponse.xpEarned || 0} XP Earned
                  </Text>
                </View>

                {logResponse.leveledUp && (
                  <Text style={styles.levelUpText}>🎊 Level Up! 🎊</Text>
                )}

                {logResponse.completedGoals && logResponse.completedGoals.length > 0 && (
                  <View style={{ marginTop: 10 }}>
                    <Text style={{fontSize: 16, color: COLORS.primary, marginBottom: 5, fontWeight: '600' }}>Completed Goals:</Text>
                    {logResponse.completedGoals.map((goal, idx) => (
                      <Text key={idx} style={styles.goalText}>✓ {goal}</Text>
                    ))}
                  </View>
                )}
              </>
            )}
            
            <Button 
              title="Awesome!" 
              onPress={() => {
                setSuccessModalVisible(false);
                setLogResponse(null);
              }} 
            />
          </View>
        </View>
      </Modal>


    </View>
  );
}