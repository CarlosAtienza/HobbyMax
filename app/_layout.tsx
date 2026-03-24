import InitialLayout from "@/components/InitialLayout";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";
import { useUserSync } from "@/hooks/useUserSync";
import { useAuthStore } from "@/stores/authStore";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const { initialize: initializeAuth, isLoading: isAuthLoading } =
    useAuthStore();
  const { initialize: initializeOnboarding, isLoading: isOnboardingLoading } =
    useOnboardingStore();

  useEffect(() => {
    initializeAuth();
    initializeOnboarding();
  }, []);

  useTokenRefresh();
  useUserSync();

  const isLoading = isAuthLoading || isOnboardingLoading;

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#000",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <InitialLayout />
    </SafeAreaProvider>
  );
}
