
import { useAuthStore } from "@/stores/authStore";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

export default function InitialLayout() {
   

    const segments = useSegments();
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
   

    const { isSignedIn, checkToken } = useAuthStore();

    useEffect(() => {
            const init = async () => {
                await checkToken();
                setIsLoaded(true);
                };
            init();
        }, []);


    useEffect(() => {
        if (!isLoaded) return;
        const inAuthScreen = segments[0] === "(auth)";

        if (!isSignedIn && !inAuthScreen) {
            router.replace("/(auth)/register");
        }
        else if (isSignedIn && inAuthScreen) {
            console.log("Redirecting to main app");
            router.replace("/(tabs)");
        }

    }, [isLoaded, isSignedIn, segments])

    if (!isLoaded) return null;

    return <Stack screenOptions={{ headerShown: false }} />

}