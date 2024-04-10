import React, { useEffect, useState } from "react";
import { IProduct } from "@/types/product.interface";
import { api } from "@/services/api";
import { useSession } from "./authentication";

const ProductContext = React.createContext<{
  products: Array<IProduct>;
  isLoading: boolean;
}>({
  products: [],
  isLoading: false,
});

export function useProducts() {
  const value = React.useContext(ProductContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useProducts must be wrapped in a <ProductProvider />");
    }
  }
  return value;
}

export function ProductProvider(props: React.PropsWithChildren) {
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ProductContext.Provider value={{ products, isLoading }}>
      {props.children}
    </ProductContext.Provider>
  );
}
