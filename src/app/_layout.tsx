import "@/styles/global.css";
import { SessionProvider } from "@/contexts/authentication";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { OrderProvider } from "@/contexts/orders";
import { ProductProvider } from "@/contexts/products";
import { CartProvider } from "@/contexts/cart";

export default function Root() {
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
