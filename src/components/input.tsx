import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  onChangeText: (text: string) => void;
  label?: string;
  placeholder: string;
  capitalize?: boolean;
  isPassword?: boolean;
}

export function Input(props: InputProps) {
  return (
    <View className="gap-2">
      {props.label && (
        <Text className="font-light text-foreground-primary">
          {props.label}
        </Text>
      )}
      <TextInput
        className="h-16 bg-background-secondary font-regular rounded-xl px-4 text-foreground-primary"
        placeholderClassName="text-foreground-secondary"
        autoCapitalize={props.capitalize ? "sentences" : "none"}
        {...props}
      />
    </View>
  );
}

export function PasswordInput(props: InputProps) {
  return (
    <View className="gap-2">
      {props.label && (
        <Text className="font-light text-foreground-primary">
          {props.label}
        </Text>
      )}
      <TextInput
        secureTextEntry={true}
        className="h-16 bg-background-secondary font-regular rounded-xl px-4 text-foreground-primary"
        placeholderClassName="text-foreground-secondary"
        autoCapitalize={props.capitalize ? "sentences" : "none"}
        {...props}
      />
    </View>
  );
}
