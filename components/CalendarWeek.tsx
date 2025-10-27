import { useHobbyLogStore } from '@/stores/hobbyLogStore';
import { styles } from '@/styles/styles';
import { addDays, format, isSameDay, startOfWeek } from 'date-fns';
import React, { useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

export default function CalendarWeek() {
  const { weeklyLogs } = useHobbyLogStore();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const today = new Date();
  const start = startOfWeek(today, { weekStartsOn: 0 }); // Sunday

  const weekDays = [...Array(7)].map((_, i) => addDays(start, i));

  const handleDayPress = (day: Date) => {
    setSelectedDate(day);
    setModalVisible(true);
  };

  const weeklyLogsForSelectedDate = weeklyLogs.filter(
    (log) => format(new Date(log.date), 'yyyy-MM-dd') === format(selectedDate || new Date(), 'yyyy-MM-dd')
  );

  console.log("Weekly Logs: ", weeklyLogs)

  return (
    <View style={styles.calendarContainer}>
      <Text style={styles.weekHeader}>This Week</Text>

      <View style={styles.weekRow}>
        {weekDays.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayButton,
              isSameDay(day, today) && styles.todayButton
            ]}
            onPress={() => handleDayPress(day)}
          >
            <Text style={styles.dayLabel}>{format(day, 'EEE')}</Text>
            <Text style={styles.dayNumber}>{format(day, 'd')}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal for Logs */}
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Logs for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}
            </Text>

            {weeklyLogsForSelectedDate.length > 0 ? (
              <FlatList
                data={weeklyLogsForSelectedDate}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.logItem}>
                    <Text style={styles.logText}>{item.description}</Text>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.noLogsText}>No logs for this date</Text>
            )}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
