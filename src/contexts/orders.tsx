import React, { useEffect, useState } from "react";
import { IOrder } from "@/types/order.interface";
import { api } from "@/services/api";
import { useSession } from "./authentication";

const OrderContext = React.createContext<{
  orders: Array<IOrder>;
  isLoading: boolean;
  addOrder(order: IOrder): void;
  fetchOrders(): void;
}>({
  orders: [],
  isLoading: false,
  addOrder: () => {},
  fetchOrders: () => {},
});

export function useOrders() {
  const value = React.useContext(OrderContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useOrders must be wrapped in a <OrderProvider />");
    }
  }
  return value;
}

export function OrderProvider(props: React.PropsWithChildren) {
  const { session, user, isLoadingSession, isLoadingUser } = useSession();
  // TODO: add new order to list when placing a new order on cart context
  const [orders, setOrders] = useState<Array<IOrder>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function addOrder(order: IOrder) {
    setOrders((prev) => [order, ...prev]);
  }

  function fetchOrders() {
    setIsLoading(true);
    api
      .get(`/orders/user/${user?.id}`, {
        headers: { Authorization: `Bearer ${session}` },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (!(isLoadingSession || isLoadingUser)) {
      fetchOrders();
    }
  }, [isLoadingSession, isLoadingUser]);

  return (
    <OrderContext.Provider value={{ orders, isLoading, addOrder, fetchOrders }}>
      {props.children}
    </OrderContext.Provider>
  );
}
