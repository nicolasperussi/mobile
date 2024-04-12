import Button from "@/components/button";
import FloatingCart from "@/components/floating-cart";
import ProductCard from "@/components/product-card";
import { useCart } from "@/contexts/cart";
import { useProducts } from "@/contexts/products";
import BRL from "@/utils/BRL";
import { useRouter } from "expo-router";
import { createRef, useEffect, useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { twMerge } from "tailwind-merge";

const categories = [
  {
    name: "SANDWICH",
    title: "Sanduíches",
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

  const flatListRef = useRef<FlatList | null>(null);

  const sectionRefs = useRef<{ [key: number]: View | null }>({});
  const scrollViewRef = useRef<ScrollView | null>(null);

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  function scrollToCategory(categoryIndex: number) {
    sectionRefs.current[categoryIndex]!.measure(
      (fx, fy, width, height, px, py) =>
        scrollViewRef?.current?.scrollTo({ y: fy, animated: true })
    );
  }

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const scrollYOffset = event.nativeEvent.contentOffset.y;
    if (scrollYOffset < 1380.5) {
      flatListRef.current?.scrollToIndex({
        index: 0,
        animated: true,
      });
      return setCurrentCategoryIndex(0);
    }
    if (scrollYOffset < 2495) {
      flatListRef.current?.scrollToIndex({
        index: 1,
        animated: true,
      });
      return setCurrentCategoryIndex(1);
    }
    if (scrollYOffset < 3609.5) {
      flatListRef.current?.scrollToIndex({
        index: 2,
        animated: true,
      });
      return setCurrentCategoryIndex(2);
    }
    flatListRef.current?.scrollToIndex({
      index: 3,
      animated: true,
    });
    return setCurrentCategoryIndex(3);
  }

  return (
    products && (
      <View className="flex-1 bg-background-primary pt-8">
        <FloatingCart />
        <View>
          <FlatList
            ref={flatListRef}
            keyExtractor={(item) => item.name}
            contentContainerStyle={{
              gap: 12,
              marginHorizontal: 24,
              paddingRight: 48,
            }}
            style={{
              flexGrow: 0,
              paddingBottom: 28,
            }}
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => scrollToCategory(index)}
                >
                  <View
                    className={twMerge(
                      "rounded-lg px-6 h-14 justify-center",
                      currentCategoryIndex === index
                        ? "bg-tint"
                        : "bg-background-secondary"
                    )}
                  >
                    <Text
                      className={
                        currentCategoryIndex === index
                          ? "text-foreground-primary font-semibold"
                          : "text-foreground-primary font-regular"
                      }
                    >
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            horizontal
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={1000}
          ref={scrollViewRef}
          contentContainerStyle={{ paddingHorizontal: 24 }}
        >
          {categories.map((category, index) => (
            <View
              className="mb-6"
              key={index}
              ref={(ref) => (sectionRefs.current[index] = ref)}
            >
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
