import HobbyLogList from '@/components/HobbyLogList';
import { HobbyLogResponseDTO, HobbyResponseDTO } from '@/models/api';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';


export default function HobbyDetails() {
  const { hobbyData: hobbyDataRaw, id: idRaw } = useLocalSearchParams();

  // Normalize to string
  const hobbyData = Array.isArray(hobbyDataRaw) ? hobbyDataRaw[0] : hobbyDataRaw ?? '';
  const id = Array.isArray(idRaw) ? idRaw[0] : idRaw ?? '';

  const parsedHobbyData: HobbyResponseDTO | null = hobbyData
    ? JSON.parse(hobbyData)
    : null;

  const logs: HobbyLogResponseDTO[] = parsedHobbyData?.logs ?? [];
  return (
    <View>
      <HobbyLogList hobbyId={Number(id)} logs={logs} />
    </View>
  )
}