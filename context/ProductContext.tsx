import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from "react";
import { Alert } from "react-native";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  price: string;
  photo: string | null;
  createdAt: number;
}

interface ProductState {
  products: Product[];
}

type ProductAction =
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: string };

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void;
  deleteProduct: (id: string) => void;
  canAddProduct: boolean;
  productCount: number;
  MAX_PRODUCTS: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const MAX_PRODUCTS = 5;

// ─── Reducer ──────────────────────────────────────────────────────────────────
function productReducer(
  state: ProductState,
  action: ProductAction
): ProductState {
  switch (action.type) {
    case "ADD_PRODUCT":
      return { products: [...state.products, action.payload] };
    case "DELETE_PRODUCT":
      return {
        products: state.products.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productReducer, { products: [] });

  const addProduct = (product: Omit<Product, "id" | "createdAt">) => {
    if (state.products.length >= MAX_PRODUCTS) return;

    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    dispatch({ type: "ADD_PRODUCT", payload: newProduct });

    // Notify user when limit is reached
    if (state.products.length + 1 === MAX_PRODUCTS) {
      Alert.alert(
        "🛑 Product Limit Reached",
        "You've added the maximum of 5 products. Delete one to add more.",
        [{ text: "Got it", style: "default" }]
      );
    }
  };

  const deleteProduct = (id: string) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        addProduct,
        deleteProduct,
        canAddProduct: state.products.length < MAX_PRODUCTS,
        productCount: state.products.length,
        MAX_PRODUCTS,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
}