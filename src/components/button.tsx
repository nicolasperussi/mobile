import { Text, TouchableOpacity, View } from "react-native";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  onPress: () => void;
  text: string;
  className?: string;
}

function Button({ onPress, text, className }: ButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        className={twMerge(
          "w-full bg-tint items-center justify-center h-14 rounded-xl px-10",
          className
        )}
      >
        <Text className="text-foreground-primary font-medium">{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Button;
