import React, { createContext, useContext, useReducer, useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import { MAX_PRODUCTS } from '../components/theme';

// ─── Notification Setup ───────────────────────────────────────────────────────
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// ─── Initial State ────────────────────────────────────────────────────────────
const initialState = {
  products: [],
  isLimitReached: false,
};

// ─── Action Types ─────────────────────────────────────────────────────────────
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

// ─── Reducer ──────────────────────────────────────────────────────────────────
function productReducer(state, action) {
  switch (action.type) {
    case ADD_PRODUCT: {
      if (state.products.length >= MAX_PRODUCTS) return state;
      const newProducts = [...state.products, action.payload];
      return {
        ...state,
        products: newProducts,
        isLimitReached: newProducts.length >= MAX_PRODUCTS,
      };
    }
    case DELETE_PRODUCT: {
      const newProducts = state.products.filter((p) => p.id !== action.payload);
      return {
        ...state,
        products: newProducts,
        isLimitReached: newProducts.length >= MAX_PRODUCTS,
      };
    }
    case UPDATE_PRODUCT: {
      const newProducts = state.products.map((p) =>
        p.id === action.payload.id ? { ...p, ...action.payload } : p
      );
      return {
        ...state,
        products: newProducts,
        isLimitReached: newProducts.length >= MAX_PRODUCTS,
      };
    }
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const scheduleLimitNotification = useCallback(async () => {
    await Notifications.requestPermissionsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🚫 Product Limit Reached',
        body: `You have reached the maximum of ${MAX_PRODUCTS} products. Delete one to add more.`,
        sound: true,
      },
      trigger: null, // immediate
    });
  }, []);

  const addProduct = useCallback(
    async (product) => {
      if (state.products.length >= MAX_PRODUCTS) {
        await scheduleLimitNotification();
        return false;
      }
      dispatch({ type: ADD_PRODUCT, payload: product });
      // Notify when we hit the limit after this add
      if (state.products.length + 1 >= MAX_PRODUCTS) {
        await scheduleLimitNotification();
      }
      return true;
    },
    [state.products.length, scheduleLimitNotification]
  );

  const deleteProduct = useCallback((id) => {
    dispatch({ type: DELETE_PRODUCT, payload: id });
  }, []);

  const updateProduct = useCallback((product) => {
    dispatch({ type: UPDATE_PRODUCT, payload: product });
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        isLimitReached: state.isLimitReached,
        addProduct,
        deleteProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used inside ProductProvider');
  return ctx;
}
