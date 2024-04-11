import { router } from "expo-router";
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useSession } from "@/contexts/authentication";
import { Input, PasswordInput } from "@/components/input";
import { useState } from "react";
import Button from "@/components/button";

export default function SignIn() {
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }} // Make sure your component takes the entire screen
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior based on platform
    >
      <ScrollView
        className="bg-background-primary p-10"
        contentContainerStyle={{
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <View className="w-full items-center justify-center gap-16">
          <Text className="font-medium text-3xl text-foreground-primary">
            Entrar
          </Text>
          <View className="w-full gap-12">
            <View className="w-full gap-8">
              <Input
                label="E-mail"
                onChangeText={setEmail}
                placeholder="E-mail"
                capitalize={false}
                autoComplete="email"
              />
              <PasswordInput
                label="Senha"
                onChangeText={setPassword}
                placeholder="Senha"
                capitalize={false}
                isPassword
              />
              {/* <TouchableOpacity>
                <Text className="text-tint">Esqueceu a senha?</Text>
              </TouchableOpacity> */}
            </View>

            <Button text="Entrar" onPress={() => signIn(email, password)} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
