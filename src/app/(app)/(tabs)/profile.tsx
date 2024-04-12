import Button from "@/components/button";
import FloatingCart from "@/components/floating-cart";
import { useSession } from "@/contexts/authentication";
import { View } from "react-native";

function Profile() {
  const { signOut } = useSession();
  return (
    <View className="flex-1 items-center justify-center bg-background-primary">
      <FloatingCart />
      <Button onPress={signOut} text="Sair" />
    </View>
  );
}

export default Profile;
