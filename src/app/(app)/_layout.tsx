import { Redirect, Stack, useRouter } from "expo-router";

import { useSession } from "@/contexts/authentication";
import { Pressable, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ProductProvider } from "@/contexts/products";
import { CartProvider } from "@/contexts/cart";
import Icon from "@expo/vector-icons/FontAwesome5";
import { colors } from "@/styles/colors";

export default function AppLayout() {
  const { session, isLoadingSession } = useSession();
  const router = useRouter();

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
      <CartProvider>
        <StatusBar style="light" />

        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="[product]"
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen
            name="address"
            options={{
              presentation: "modal",
              header: () => (
                <View className="bg-background-secondary h-16 items-center justify-center flex-row relative">
                  <Pressable
                    onPress={() => router.back()}
                    className="absolute left-8"
                  >
                    <Icon
                      name="chevron-down"
                      size={16}
                      color={colors.foreground.primary}
                    />
                  </Pressable>
                  <Text className="text-foreground-primary text-lg font-medium">
                    Selecionar endereço
                  </Text>
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="cart"
            options={{
              presentation: "modal",
              header: () => (
                <View className="bg-background-secondary h-16 items-center justify-center flex-row relative">
                  <Pressable
                    onPress={() => router.back()}
                    className="absolute left-8"
                  >
                    <Icon
                      name="chevron-down"
                      size={16}
                      color={colors.foreground.primary}
                    />
                  </Pressable>
                  <Text className="text-foreground-primary text-lg font-medium">
                    Carrinho
                  </Text>
                </View>
              ),
            }}
          />
        </Stack>
      </CartProvider>
    </ProductProvider>
  );
}
