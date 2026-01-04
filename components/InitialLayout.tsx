
import { useAuthStore } from "@/stores/authStore";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function InitialLayout() {

    const segments = useSegments();
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuthStore();


    useEffect(() => {
        if (isLoading) return;
        const inAuthScreen = segments[0] === "(auth)";
    
        //User not logged in, go to login
        if (!isAuthenticated && !inAuthScreen) {
            router.replace("/(auth)/login");
        }
        //User logged in, redirect to index
        else if (isAuthenticated && inAuthScreen) {
            console.log("Redirecting to main app");
            router.replace("/(tabs)");

        }

    }, [isAuthenticated, isLoading, segments]);

   

    return <Stack screenOptions={{ headerShown: false }}>
       
       

    </Stack>

}