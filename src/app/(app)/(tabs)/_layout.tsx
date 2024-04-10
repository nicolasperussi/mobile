import AddressHeader from "@/components/address-header";
import Header from "@/components/header";
import { useSession } from "@/contexts/authentication";
import { colors } from "@/styles/colors";
import Icon from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// import Header from "../../components/Header";
// import { useTheme } from "../../theme";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Icon>["name"];
  color: string;
}) {
  return <Icon size={24} {...props} />;
}

export default function TabLayout() {
  const statusBarInsets = useSafeAreaInsets();
  const { session, user } = useSession();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background.secondary,
          elevation: 0,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: colors.tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          header: () => (
            <Header>
              <AddressHeader />
            </Header>
          ),
          title: "Produtos",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="hamburger" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          header: () => (
            <Header>
              <Text className="text-foreground-primary text-lg font-medium">
                Meu Perfil
              </Text>
            </Header>
          ),
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-alt" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
