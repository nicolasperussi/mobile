import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  isModal?: boolean;
  children: React.ReactNode;
}

function Header({ children, isModal = false }: HeaderProps) {
  const statusBarInsets = useSafeAreaInsets();

  return (
    <View
      className="bg-background-secondary"
      style={{
        paddingTop: isModal ? 0 : statusBarInsets.top,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
      }}
    >
      <View className="h-16 items-center justify-center flex-row gap-4">
        {children}
      </View>
    </View>
  );
}

export default Header;
