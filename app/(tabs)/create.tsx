import CreateHobby from '@/components/CreateHobby';
import { styles } from "@/styles/styles";
import React from 'react';
import { View } from 'react-native';


export default function create() {


  return (
    <View style={styles.container}>
      <CreateHobby/>
    </View>
  )
}