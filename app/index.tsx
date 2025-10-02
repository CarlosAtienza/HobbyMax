import { Redirect } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    const clearToken = async () => {
      await SecureStore.deleteItemAsync('token');
      console.log("Token cleared on app start");
    };
    clearToken();
  }, [])

  return <Redirect href="/(auth)/login" />;
}
