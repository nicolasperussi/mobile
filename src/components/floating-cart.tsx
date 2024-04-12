import { useCart } from "@/contexts/cart";
import { Text } from "react-native";
import { View } from "react-native";
import Button from "./button";
import BRL from "@/utils/BRL";
import { useRouter } from "expo-router";

function FloatingCart() {
  const { items, totalPrice } = useCart();
  const router = useRouter();

  return (
    items.length > 0 && (
      <View
        className="absolute w-screen h-20 bg-background-secondary z-50 bottom-0 flex-row justify-between p-6 items-center"
        style={{
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
        <View className="flex-row items-baseline gap-2">
          <Text className="text-foreground-primary font-regular text-2xl">
            {BRL(totalPrice)}
          </Text>
          <Text className="text-foreground-secondary font-light">
            / {items.length} {items.length > 1 ? "itens" : "item"}
          </Text>
        </View>
        <Button
          text="Ver sacola"
          onPress={() => router.push("/cart")}
          className="h-[40px]"
        />
      </View>
    )
  );
}

export default FloatingCart;
