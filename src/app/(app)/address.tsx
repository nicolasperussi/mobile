import { Input } from "@/components/input";
import { useSession } from "@/contexts/authentication";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, Pressable, Text, TextInput, View } from "react-native";
import { twMerge } from "tailwind-merge";
import Icon from "@expo/vector-icons/FontAwesome5";
import { colors } from "@/styles/colors";

function Address() {
  const { user, selectedAddress, setAddress } = useSession();
  const [addressSearch, setAddressSearch] = useState("");
  const router = useRouter();

  const addressList = user?.addresses || [];
  const rearrangedAddresses = selectedAddress
    ? [
        selectedAddress,
        ...addressList.filter((address) => {
          return !(
            address.cep === selectedAddress.cep &&
            address.street === selectedAddress.street &&
            address.number === selectedAddress.number
          );
        }),
      ]
    : addressList;

  function handleChangeAddress(address: {
    cep: string;
    street: string;
    number: string;
  }) {
    setAddress(JSON.stringify(address));
    router.back();
  }

  // TODO: add option to add new address to account
  return (
    <Pressable
      onPress={Keyboard.dismiss}
      className="flex-1 bg-background-secondary px-8 pt-4 pb-10 gap-8"
    >
      <TextInput
        className="h-16 bg-background-primary font-regular rounded-xl px-4 text-foreground-primary"
        placeholderClassName="text-foreground-secondary"
        placeholder="Pesquisar endereço..."
        onChangeText={setAddressSearch}
      />
      {rearrangedAddresses.map((address, i) => (
        <Pressable
          onPress={() => handleChangeAddress(address)}
          key={i}
          className={twMerge(
            "border border-foreground-secondary rounded-lg p-6 flex-row justify-between items-center",
            i === 0 && "border-tint"
          )}
        >
          <View className="gap-1 flex-1">
            <Text className="text-xl font-regular text-foreground-primary">
              {address.street}, {address.number}
            </Text>
            <Text className="text-sm font-light text-foreground-secondary">
              {address.cep}
            </Text>
          </View>
          {i === 0 && (
            <View className="size-10 items-center justify-center rounded-full bg-tint">
              <Icon size={16} name="check" color={colors.foreground.primary} />
            </View>
          )}
        </Pressable>
      ))}
    </Pressable>
  );
}

export default Address;
