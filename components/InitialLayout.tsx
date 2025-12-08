
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/authStore";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

export default function InitialLayout() {

    const segments = useSegments();
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
   

    const { token, loadToken, userId, logout, setUser } = useAuthStore();

  

    useEffect(() => {
        
        const init = async () => {
            const {token: savedToken, userId: savedUserId } = await loadToken();
           
            console.log("Loaded token:", savedToken);
            // console.log("Loaded userId:", savedUserId);
         
            if (savedToken && savedUserId) {
                
                try {
                    const userResponse = await axiosInstance.get(`/users/${savedUserId}`, {
                        headers: { Authorization: `Bearer ${savedToken}`},
                        });
                    //console.log("Fetched user data on init:", userResponse.data);
                    setUser(userResponse.data);
                } catch (error) {
                    console.error("Failed to fetch user data", error);
                    await logout();
                    }
            }

                setIsLoaded(true);
                };
            init();
        }, [loadToken]);


    useEffect(() => {
        if (!isLoaded) return;
        const inAuthScreen = segments[0] === "(auth)";
        const isSignedIn = !!token;

        if (!isSignedIn && !inAuthScreen) {
            router.replace("/(auth)/login");
        }
        else if (isSignedIn && inAuthScreen) {
            console.log("Redirecting to main app");
            router.replace("/(tabs)");

        }

    }, [isLoaded, token, segments])

    if (!isLoaded) return null;

    return <Stack screenOptions={{ headerShown: false }}>
       
       

    </Stack>

}