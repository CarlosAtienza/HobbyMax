import InitialLayout from "@/components/InitialLayout";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const publishableKey = process.env.CLERK_PUBLISHABLE_KEY;

export default function RootLayout() {
  return (
    
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }} >
      
        <InitialLayout />
       
      
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
