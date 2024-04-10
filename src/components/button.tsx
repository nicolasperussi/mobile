import { Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  onPress: () => void;
  text: string;
}

function Button({ onPress, text }: ButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View className="w-full bg-tint items-center justify-center h-14 rounded-xl">
        <Text className="text-foreground-primary font-medium">{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Button;
