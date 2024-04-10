import "@/styles/global.css";
import { SessionProvider } from "@/contexts/authentication";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Root() {
  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <SessionProvider>
      <StatusBar style="light" />
      <Slot />
    </SessionProvider>
    // </ThemeProvider>
  );
}
