import AddressHeader from "@/components/address-header";
import Header from "@/components/header";
import { colors } from "@/styles/colors";
import Icon from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import { Text } from "react-native";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Icon>["name"];
  color: string;
}) {
  return <Icon size={24} {...props} />;
}

export default function TabLayout() {
  // TODO: change tab bar style to figma layout
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background.secondary,
          elevation: 0,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: colors.tint,
        tabBarLabelStyle: { fontFamily: "Poppins_400Regular" },
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
        name="orders"
        options={{
          title: "Pedidos",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="receipt" color={color} />
          ),
          header: () => (
            <Header>
              <Text className="text-foreground-primary text-lg font-medium">
                Meus Pedidos
              </Text>
            </Header>
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
