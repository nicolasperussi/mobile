import { useSession } from "@/contexts/authentication";
import { Text } from "react-native";

function Profile() {
  const { signOut } = useSession();
  return <Text onPress={signOut}>Sign Out</Text>;
}

export default Profile;
