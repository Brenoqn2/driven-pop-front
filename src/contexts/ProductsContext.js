import { createContext, useState, useContext } from "react";

export const ProductContext = createContext();

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState([])

  return (
    <ProductContext.Provider value={{ products, setProducts,currentPage, setCurrentPage }}>
      {children}
    </ProductContext.Provider>
  );
}
export function useProducts() {
  const context = useContext(ProductContext);
  const { products, setProducts } = context;
  return { products, setProducts };
}

export function usePage(){
  const context = useContext(ProductContext)
  const {currentPage, setCurrentPage} = context
  return { currentPage, setCurrentPage }
}
