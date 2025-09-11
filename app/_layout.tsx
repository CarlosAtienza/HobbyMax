import InitialLayout from "@/components/InitialLayout";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const publishableKey = process.env.CLERK_PUBLISHABLE_KEY;

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }} >
      
        <InitialLayout />
       
      
      </SafeAreaView>
    </SafeAreaProvider>
    </ClerkLoaded>
    </ClerkProvider>
  )
}
