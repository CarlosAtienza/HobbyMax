import InitialLayout from "@/components/InitialLayout";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";
import { useUserSync } from "@/hooks/useUserSync";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const { initialize, isLoading } = useAuthStore();

  useEffect(() => {
    initialize();
  }, []);

  useTokenRefresh();
  useUserSync();
                        
  if (isLoading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#fff" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
        <InitialLayout />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
