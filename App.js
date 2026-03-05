import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProductProvider } from './context/ProductContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProductProvider>
        <AppNavigator />
      </ProductProvider>
    </SafeAreaProvider>
  );
}
