import { useOrders } from "@/contexts/orders";
import { Image } from "expo-image";
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";
import { colors } from "@/styles/colors";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import localizedFormat from "dayjs/plugin/localizedFormat";
import getOrderStatus from "@/utils/order-status";
import { twMerge } from "tailwind-merge";
import { useCart } from "@/contexts/cart";
import { useRouter } from "expo-router";
import { IOrder } from "@/types/order.interface";
import FloatingCart from "@/components/floating-cart";

dayjs.locale(ptBR);
dayjs.extend(localizedFormat);

function Orders() {
  const { orders, isLoading, fetchOrders } = useOrders();
  const { addToCart } = useCart();
  const router = useRouter();

  return (
    <View className="flex-1 bg-background-primary px-6">
      <FloatingCart />
      <FlatList
        contentContainerStyle={{ gap: 24, paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(order) => order.id.toString()}
        data={orders}
        // TODO: add refresh loading indicator
        refreshControl={
          <RefreshControl
            tintColor={colors.foreground.secondary}
            colors={[colors.foreground.secondary]}
            refreshing={isLoading}
            onRefresh={fetchOrders}
          />
        }
        ListEmptyComponent={() => (
          <View className="items-center justify-center">
            <Text className="font-regular text-foreground-secondary">
              Você ainda não tem pedidos!
            </Text>
          </View>
        )}
        renderItem={({ item: order, index }) => (
          <View
            key={order.id}
            className="rounded-lg bg-background-secondary p-6 gap-4"
          >
            <View className="flex-row items-center gap-6">
              <Image
                style={{ width: 64, height: 64, borderRadius: 8 }}
                source={`http://192.168.0.167:3003/images/${order.items[0].product.slug}.jpg`}
              />
              <View className="flex-1 gap-2">
                <Text className="text-2xl text-foreground-primary font-medium">
                  Pedido nº {order.id}
                </Text>
                <View className="flex-row gap-2 items-center">
                  <View
                    className={twMerge(
                      "size-4 items-center justify-center rounded-full",
                      getOrderStatus(order.status).color
                    )}
                  />
                  <Text className="text-foreground-secondary font-regular">
                    {getOrderStatus(order.status).display}
                  </Text>
                </View>
              </View>
              <Icon
                size={20}
                name="chevron-right"
                color={colors.foreground.secondary}
              />
            </View>
            <View className="w-full h-[1px] bg-foreground-primary/10" />
            <View className="gap-2">
              {order.items.length <= 2 ? (
                order.items.map((item) => (
                  <View
                    key={item.product.id}
                    className="flex-row gap-2 items-center"
                  >
                    <View className="size-8 items-center justify-center rounded-full bg-background-primary">
                      <Text className="text-foreground-secondary font-regular">
                        {item.quantity}
                      </Text>
                    </View>
                    <Text className="text-foreground-secondary font-regular">
                      {item.product.name}
                    </Text>
                  </View>
                ))
              ) : (
                <>
                  <View className="flex-row gap-2 items-center">
                    <View className="size-8 items-center justify-center rounded-full bg-background-primary">
                      <Text className="text-foreground-secondary font-regular">
                        {order.items[0].quantity}
                      </Text>
                    </View>
                    <Text className="text-foreground-secondary font-regular">
                      {order.items[0].product.name}
                    </Text>
                  </View>
                  <Text className="uppercase font-medium text-foreground-secondary">
                    E mais {order.items.length - 1} itens
                  </Text>
                </>
              )}
            </View>
            <View className="w-full h-[1px] bg-foreground-primary/10" />
            <View className="flex-row justify-between items-center">
              <Text className="text-foreground-secondary font-medium text-lg">
                {dayjs(order.moment).format("D MMM[.] YYYY, HH[:]mm")}
              </Text>
              <Pressable
                onPress={() => {
                  order.items.forEach((item) =>
                    addToCart(item.product, item.quantity)
                  );
                  router.push("/(app)/cart");
                }}
              >
                <Text className="text-lg font-medium text-tint">
                  Refazer pedido
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default Orders;
