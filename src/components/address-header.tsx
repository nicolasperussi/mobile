import { useSession } from "@/contexts/authentication";
import { Text } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import { colors } from "@/styles/colors";

function AddressHeader() {
  const { user } = useSession();
  return user?.addresses && user.addresses.length > 0 ? (
    <>
      <Text className="text-foreground-primary text-lg font-medium">
        {user.addresses[0].street}, {user.addresses[0].number}
      </Text>
      <Icon size={16} name="chevron-down" color={colors.tint} />
    </>
  ) : (
    <>
      <Text className="text-foreground-primary text-lg font-medium">
        Adicionar Endereço
      </Text>
      <Icon size={16} name="plus" color={colors.tint} />
    </>
  );
}

export default AddressHeader;
