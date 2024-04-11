import { colors } from "@/styles/colors";
import { IProduct } from "@/types/product.interface";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome5";
import { useCart } from "@/contexts/cart";
import BRL from "@/utils/BRL";

interface CartProductProps {
  product: IProduct;
  quantity: number;
}

function CartProduct({ product, quantity }: CartProductProps) {
  const { addToCart, removeFromCart } = useCart();

  return (
    <View className="flex-row gap-4">
      <Image
        style={{ width: 80, height: 80, borderRadius: 8 }}
        contentFit="cover"
        source={`http://192.168.0.167:3003/images/${product.slug}.jpg`}
      />
      <View className="justify-between flex-1">
        <Text className="font-medium text-foreground-primary" numberOfLines={1}>
          {product.name}
        </Text>
        <View className="flex-row rounded-lg items-center gap-8">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => removeFromCart(product, 1)}
          >
            <View className="p-3 bg-background-primary rounded-lg">
              <Icon name="minus" size={20} color={colors.foreground.primary} />
            </View>
          </TouchableOpacity>
          <Text className="text-center w-5 font-medium text-foreground-primary">
            {quantity}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => addToCart(product, 1)}
          >
            <View className="p-3 bg-background-primary rounded-lg">
              <Icon name="plus" size={20} color={colors.foreground.primary} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View className="justify-end gap-2">
        <Text className="text-right text-xs font-medium text-foreground-secondary">
          {BRL(product.price)} x {quantity}
        </Text>
        <Text className="text-right text-xl font-medium text-foreground-primary">
          {BRL(product.price * quantity)}
        </Text>
      </View>
    </View>
  );
}

export default CartProduct;
