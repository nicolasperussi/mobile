import Button from "@/components/button";
import ProductCard from "@/components/product-card";
import { useCart } from "@/contexts/cart";
import { useProducts } from "@/contexts/products";
import BRL from "@/utils/BRL";
import { useRouter } from "expo-router";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const categories = [
  {
    name: "SANDWICH",
    title: "Sanduiches",
  },
  {
    name: "SIDE",
    title: "Acompanhamentos",
  },
  {
    name: "DRINK",
    title: "Bebidas",
  },
  {
    name: "DESSERT",
    title: "Sobremesas",
  },
];

const formatData = (data: any, numColumns: number) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow = numberOfElementsLastRow + 1;
  }

  return data;
};

export default function Index() {
  const { products, isLoading: isLoadingProducts } = useProducts();
  const { items, totalPrice } = useCart();
  const router = useRouter();
  const numColumns = 2;

  return (
    products && (
      <View className="flex-1 bg-background-primary pt-10 px-6">
        {items.length > 0 && (
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
              <Text className="text-foreground-primary text-2xl">
                {BRL(totalPrice)}
              </Text>
              <Text className="text-foreground-secondary">
                / {items.length} {items.length > 1 ? "itens" : "item"}
              </Text>
            </View>
            <Button
              text="Ver sacola"
              onPress={() => router.push("/cart")}
              className="h-[40px]"
            />
          </View>
        )}
        <View style={{ marginRight: -20 }}>
          <FlatList
            keyExtractor={(item) => item.name}
            contentContainerStyle={{
              gap: 12,
            }}
            style={{
              flexGrow: 0,
              paddingBottom: 40,
            }}
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({ item, index }) => {
              // TODO: scroll screen to match selected category
              return (
                <TouchableOpacity activeOpacity={0.8}>
                  <View className="rounded-lg bg-background-secondary px-6 h-16 justify-center">
                    <Text className="text-foreground-primary">
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            horizontal
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {categories.map((category, index) => (
            <View className="mb-6" key={index}>
              <Text className="text-foreground-primary text-2xl mb-4 font-medium">
                {category.title}
              </Text>
              <FlatList
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: 16 }}
                columnWrapperStyle={{ gap: 16 }}
                numColumns={numColumns}
                data={formatData(
                  products?.filter(
                    (product) => product.category === category.name
                  ),
                  numColumns
                )}
                renderItem={({ item }) => {
                  if (item.empty)
                    return (
                      <View className="h-[250px] bg-transparent flex-col flex-[50%] rounded-lg overflow-hidden" />
                    );
                  return <ProductCard {...item} />;
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    )
  );
}
