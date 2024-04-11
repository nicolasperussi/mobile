import { useSession } from "@/contexts/authentication";
import { Pressable, Text } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";

function AddressHeader() {
  const { user, selectedAddress } = useSession();
  const router = useRouter();

  return selectedAddress ? (
    <Pressable
      className="items-center justify-center flex-row gap-4"
      onPress={() => router.push("/(app)/address")}
    >
      <Text className="text-foreground-primary text-lg font-medium">
        {selectedAddress.street}, {selectedAddress.number}
      </Text>
      <Icon size={16} name="chevron-down" color={colors.tint} />
    </Pressable>
  ) : (
    <Pressable
      className="items-center justify-center flex-row gap-4"
      onPress={() => router.push("/(app)/address")}
    >
      <Text className="text-foreground-primary text-lg font-medium">
        Adicionar Endereço
      </Text>
      <Icon size={16} name="plus" color={colors.tint} />
    </Pressable>
  );
}

export default AddressHeader;
