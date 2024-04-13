import React, { useEffect, useState } from "react";
import { IOrder } from "@/types/order.interface";
import { api } from "@/services/api";
import { useSession } from "./authentication";

import SockJS from "sockjs-client";
import Stomp from "@stomp/stompjs";

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
      const client = new Stomp.Client();
      client.webSocketFactory = () =>
        new SockJS("http://192.168.0.167:3003/scriptburger-ws") as any;

      client.onStompError = (err) => console.log(err);

      client.onConnect = function (frame) {
        console.log("Connected to WebSocket");
        client.subscribe(`/topic/orders/${user!.id}`, (message) => {
          const updatedOrder: IOrder = JSON.parse(message.body);

          setOrders((prevOrders) => [
            updatedOrder,
            ...prevOrders.filter((order) => order.id !== updatedOrder.id),
          ]);
        });
      };

      client.activate();
    }
  }, [isLoadingSession, isLoadingUser]);

  return (
    <OrderContext.Provider value={{ orders, isLoading, addOrder, fetchOrders }}>
      {props.children}
    </OrderContext.Provider>
  );
}
