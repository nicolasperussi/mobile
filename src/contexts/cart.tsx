import React, { useEffect, useState } from "react";
import { IProduct } from "@/types/product.interface";
import { api } from "@/services/api";
import { useSession } from "./authentication";
import { useOrders } from "./orders";
import { useRouter } from "expo-router";

const CartContext = React.createContext<{
  items: Array<{ product: IProduct; quantity: number }>;
  totalPrice: number;
  addToCart(product: IProduct, quantity: number): void;
  removeFromCart(product: IProduct, quantity: number): void;
  clearCart(): void;
  placeOrder(address: {
    cep: string;
    street: string;
    number: string;
  }): Promise<void>;
}>({
  items: [],
  totalPrice: 0,
  addToCart(product, quantity) {},
  removeFromCart(product, quantity) {},
  clearCart: () => {},
  async placeOrder(address: { cep: string; street: string; number: string }) {},
});

export function useCart() {
  const value = React.useContext(CartContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useProducts must be wrapped in a <ProductProvider />");
    }
  }
  return value;
}

export function CartProvider(props: React.PropsWithChildren) {
  const [items, setItems] = useState<
    Array<{ product: IProduct; quantity: number }>
  >([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { session, user } = useSession();
  const { addOrder } = useOrders();
  const router = useRouter();

  function calculateTotalPrice(
    items: Array<{ product: IProduct; quantity: number }>
  ) {
    let totalPrice = 0;

    for (const item of items) {
      const { product, quantity } = item;
      const itemTotal = product.price * quantity;
      totalPrice += itemTotal;
    }

    return totalPrice;
  }

  async function placeOrder(address: {
    cep: string;
    street: string;
    number: string;
  }) {
    const newOrder = {
      userId: user?.id,
      items: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      address,
    };
    clearCart();
    // TODO: redirect to success page on success
    api
      .post("/orders", newOrder, {
        headers: { Authorization: `Bearer ${session}` },
      })
      .then((res) => {
        addOrder(res.data);
        router.push("/(app)/(tabs)/orders");
      });
  }

  function clearCart() {
    setItems([]);
  }

  function addToCart(product: IProduct, quantity: number) {
    if (items.find((i) => i.product.slug === product.slug)) {
      const index = items.findIndex((i) => i.product.id === product.id);
      const updatedItems = [...items];
      if (updatedItems[index].quantity === 10) return;
      updatedItems[index].quantity += quantity;
      return setItems(updatedItems);
    }
    return setItems((prev) => [...prev, { product, quantity }]);
  }

  function removeFromCart(product: IProduct, quantity: number) {
    const index = items.findIndex((i) => i.product.id === product.id);
    let updatedItems = [...items];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
    } else {
      updatedItems = updatedItems.filter((p) => p.product.id !== product.id);
    }
    setItems(updatedItems);
  }

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(items));
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        totalPrice,
        placeOrder,
        clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
