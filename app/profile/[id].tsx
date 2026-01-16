import { COLORS } from '@/constants/theme';
import { useAuthStore } from '@/stores/authStore';
import { useProfileStore } from '@/stores/profileStore';
import { styles } from '@/styles/styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//TODO: When connection is clicked, it failes to fetch, but afterwards, it loads, and only the no hobbies created shows up

export default function UserProfile() {
    const router = useRouter();
    const { viewedProfile, viewedHobbies, isLoading, fetchProfile, clearProfile } = useProfileStore();
    const { userId: currentUserId, token } = useAuthStore();
    const { id } = useLocalSearchParams<{ id: string }>();
     
    useEffect(() => {
        if (!id || !token) return;
        const loadProfile = async () => {
          try {
            await fetchProfile(id, token);
          } catch {
            Alert.alert("Failed to load user. Please try again.");
            router.push("/(tabs)/profile");
          }
        };
        loadProfile();

        return () => clearProfile();
    }, [id, token]);

    const renderHeader = () => {

        if (isLoading) {
          return (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" />
              </View>
          );
        }

        else if (!viewedProfile) {
          return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text>User not found.</Text>
            </View>
          );
        }

    return (
      <>
    <View style={styles.header}>
          <Image
            source={
            viewedProfile.profilePhoto
              ? { uri: viewedProfile.profilePhoto }
              : require("@/assets/images/default-avatar.jpg")
            }
            style={styles.avatar}
          />
          <View style={{ flex: 1, marginLeft: 20 }}>
              <Text style={styles.username}>{viewedProfile.username}</Text>
            </View>          
          </View>
      
          {/* Overview Section */}
          <View style={profileStyles.sectionContainer}>
            <Text style={profileStyles.sectionTitle}>Overview</Text>
            <Text style={profileStyles.sectionText}>Total Hobbies: {viewedHobbies?.length ?? 0}</Text>
            <Text style={profileStyles.sectionText}>Current Streak: {4}</Text>
          </View>
          </>
    );    
    
        }

    


  return (
       <FlatList
            data={viewedHobbies ?? []}
            keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No Hobbies Created</Text>}
            contentContainerStyle={{ paddingBottom: 50, paddingHorizontal: 10, }}
            renderItem={({ item }) => (
              <TouchableOpacity
              onPress={() => {
                if (typeof item.id === 'number') {
                  router.push({ 
                    pathname: "/hobby/[id]", 
                    params: { 
                      hobbyData: JSON.stringify(item),
                      id: item.id.toString(),
                    } 
                  });
                }
              }}
            >
              <View style={styles.hobbyCard}>
                <Image
                  source={
                    item.hobbyImage ? 
                    { uri: item.hobbyImage } : 
                    require('@/assets/images/hobbyImagePlaceHolder.png')
                  }
                  style={styles.hobbyImageCard}
                />
                <View style={styles.hobbyInfo}>
                  <Text style={styles.hobbyName}>{item.name}</Text>
                  <View style={{ flexDirection: 'row', marginTop: 4, gap: 12 }}>
                    <Text style={styles.hobbyStats}>
                      Level {item.level || 0}
                    </Text>
                    
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            )}
          >
          
          
           
          </FlatList>
  )
}



export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#ccc",
  },
  username: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.white,
    marginLeft: 20,
  },
  

  // Section styling
  sectionContainer: {
    marginVertical: 15,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 15,
    color: "#444",
  },

});      
