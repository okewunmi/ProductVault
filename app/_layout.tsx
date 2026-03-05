import { Stack } from "expo-router";
import { ProductProvider } from "@/context/ProductContext";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <ProductProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#6C63FF" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "700", fontSize: 18 },
          headerBackTitleVisible: false,
          contentStyle: { backgroundColor: "#F5F4FF" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "ProductVault" }} />
        <Stack.Screen
          name="add-product"
          options={{ title: "Add Product", presentation: "modal" }}
        />
        <Stack.Screen name="product/[id]" options={{ title: "Product Detail" }} />
      </Stack>
    </ProductProvider>
  );
}
