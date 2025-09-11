
import { Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";

export default function InitialLayout() {
   

    const segments = useSegments();
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await SecureStore.getItemAsync("token");
                setIsSignedIn(!!token);
            } catch (error) {
                console.error("Error checking auth token:", error);
                setIsSignedIn(false);
            } finally {
                setIsLoaded(true);
            }
        };
        checkAuth();
    }, [])


    useEffect(() => {
        if (!isLoaded) return;
        const inAuthScreen = segments[0] === "(auth)";

        if (!isSignedIn && !inAuthScreen) {
            router.replace("/(auth)/register");
        }
        else if (isSignedIn && inAuthScreen) {
            router.replace("/(tabs)");
        }

    }, [isLoaded, isSignedIn, segments])

    if (!isLoaded) return null;

    return <Stack screenOptions={{ headerShown: false }} />

}