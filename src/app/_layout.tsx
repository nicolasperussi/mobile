import "@/styles/global.css";
import { SessionProvider } from "@/contexts/authentication";
import { StatusBar } from "expo-status-bar";
import { OrderProvider } from "@/contexts/orders";
import { ProductProvider } from "@/contexts/products";
import { CartProvider } from "@/contexts/cart";

import { SplashScreen, Slot } from "expo-router";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function Root() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <SessionProvider>
      <OrderProvider>
        <ProductProvider>
          <CartProvider>
            <StatusBar style="light" />
            <Slot />
          </CartProvider>
        </ProductProvider>
      </OrderProvider>
    </SessionProvider>
    // </ThemeProvider>
  );
}
