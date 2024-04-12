import React, { useEffect, useState } from "react";
import { IOrder } from "@/types/order.interface";
import { api } from "@/services/api";
import { useSession } from "./authentication";

const OrderContext = React.createContext<{
  orders: Array<IOrder>;
  isLoading: boolean;
}>({
  orders: [],
  isLoading: false,
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

  useEffect(() => {
    if (!(isLoadingSession || isLoadingUser)) {
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
  }, [isLoadingSession, isLoadingUser]);

  return (
    <OrderContext.Provider value={{ orders, isLoading }}>
      {props.children}
    </OrderContext.Provider>
  );
}
