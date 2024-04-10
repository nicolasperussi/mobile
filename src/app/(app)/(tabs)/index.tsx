import ProductCard from "@/components/product-card";
import { useProducts } from "@/contexts/products";
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
  const numColumns = 2;

  return (
    products && (
      <View className="flex-1 bg-background-primary pt-10 px-10">
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
                  <Text className="text-foreground-primary">{item.title}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          horizontal
        />
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
