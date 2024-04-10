import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  children: React.ReactNode;
}

function Header({ children }: HeaderProps) {
  const statusBarInsets = useSafeAreaInsets();

  return (
    <View
      className="bg-background-secondary"
      style={{ paddingTop: statusBarInsets.top }}
    >
      <View className="h-16 items-center justify-center flex-row gap-4">
        {children}
      </View>
    </View>
  );
}

export default Header;
