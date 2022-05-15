import { createContext, useState, useContext } from "react";

export const ProductContext = createContext();

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  return (
    <ProductContext.Provider
      value={{ products, setProducts, selectedProduct, setSelectedProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}
export function useProducts() {
  const context = useContext(ProductContext);
  const { products, setProducts } = context;
  return { products, setProducts };
}
