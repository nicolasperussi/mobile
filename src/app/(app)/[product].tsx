import { useProducts } from "@/contexts/products";
import BRL from "@/utils/BRL";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import { colors } from "@/styles/colors";
import Button from "@/components/button";
import { useCart } from "@/contexts/cart";

function Product() {
  const router = useRouter();
  const slug = useLocalSearchParams().product;
  const product = useProducts().products?.find((p) => p.slug === slug);

  const { addToCart } = useCart();

  if (!product) {
    return null;
  }

  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    if (quantity === 10) return;
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  return (
    <View className="flex-1 bg-background-secondary relative">
      <Image
        style={{ width: "100%", height: 400 }}
        source={`http://192.168.0.167:3003/images/${product.slug}.jpg`}
      />
      <View
        className="absolute h-1 w-20 bg-white rounded-full top-4"
        style={{ left: "50%", transform: "translateX(-40px)" }}
      />
      <View className="flex-1 pt-6 px-4 pb-8">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-semibold flex-1 text-foreground-primary">
            {product.name}
          </Text>
          <Text className="text-2xl font-semibold w-[130px] text-right text-foreground-primary">
            {BRL(product.price)}
          </Text>
        </View>
        <ScrollView>
          <Text
            style={{ lineHeight: 24 }}
            className="text-foreground-primary mt-6"
          >
            {product.description}
          </Text>
        </ScrollView>
        <View className="pt-5 gap-5">
          <View className="flex-row justify-between items-center">
            <Text className="text-foreground-primary text-xl font-medium">
              Quantidade
            </Text>
            <View className="flex-row p-2 rounded-lg bg-background-primary items-center justify-between">
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleDecreaseQuantity()}
              >
                <View className="p-3 bg-background-secondary rounded-lg">
                  <Icon
                    name="minus"
                    size={20}
                    color={colors.foreground.primary}
                  />
                </View>
              </TouchableOpacity>
              <Text className="text-center w-16 text-foreground-primary">
                {quantity}
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleIncreaseQuantity()}
              >
                <View className="p-3 bg-background-secondary rounded-lg">
                  <Icon
                    name="plus"
                    size={20}
                    color={colors.foreground.primary}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Button
            text={`Adicionar - ${BRL(product.price * quantity)}`}
            onPress={() => {
              addToCart(product, quantity);
              router.back();
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default Product;
