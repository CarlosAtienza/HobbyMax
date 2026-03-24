import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const ONBOARDING_KEY = "hasCompletedOnboarding";

interface OnboardingState {
  hasCompletedOnboarding: boolean;
  isLoading: boolean;
  initialize: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  hasCompletedOnboarding: false,
  isLoading: true,

  initialize: async () => {
    try {
      const value = await AsyncStorage.getItem(ONBOARDING_KEY);
      set({
        hasCompletedOnboarding: value === "true",
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to load onboarding state:", error);
      set({ isLoading: false });
    }
  },

  completeOnboarding: async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, "true");
      set({ hasCompletedOnboarding: true });
    } catch (error) {
      console.error("Failed to save onboarding state:", error);
    }
  },

  resetOnboarding: async () => {
    try {
      await AsyncStorage.removeItem(ONBOARDING_KEY);
      set({ hasCompletedOnboarding: false });
    } catch (error) {
      console.error("Failed to reset onboarding state:", error);
    }
  },
}));
