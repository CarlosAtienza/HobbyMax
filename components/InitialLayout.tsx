import { useAuthStore } from "@/stores/authStore";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function InitialLayout() {
  const segments = useSegments();
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthStore();
  const { hasCompletedOnboarding, isLoading: isOnboardingLoading } =
    useOnboardingStore();

  const isLoading = isAuthLoading || isOnboardingLoading;

  useEffect(() => {
    if (isLoading) return;

    const inAuthScreen = segments[0] === "(auth)";
    const inOnboardingScreen = segments[0] === "(onboarding)";

    // User not logged in, go to login
    if (!isAuthenticated && !inAuthScreen) {
      router.replace("/(auth)/login");
    }
    // User logged in but hasn't completed onboarding
    else if (
      isAuthenticated &&
      !hasCompletedOnboarding &&
      !inOnboardingScreen
    ) {
      router.replace("/(onboarding)");
    }
    // User logged in, completed onboarding, but still in auth or onboarding screen
    else if (
      isAuthenticated &&
      hasCompletedOnboarding &&
      (inAuthScreen || inOnboardingScreen)
    ) {
      console.log("Redirecting to main app");
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, isLoading, hasCompletedOnboarding, segments]);

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
}
