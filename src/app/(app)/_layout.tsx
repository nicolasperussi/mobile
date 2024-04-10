import { Redirect, Stack } from "expo-router";

import { useSession } from "@/contexts/authentication";
import { Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ProductProvider } from "@/contexts/products";

export default function AppLayout() {
  const { session, isLoadingSession } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoadingSession) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <ProductProvider>
      <StatusBar style="light" />

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="[product]"
          options={{ presentation: "modal", headerShown: false }}
        />
      </Stack>
    </ProductProvider>
  );
}
