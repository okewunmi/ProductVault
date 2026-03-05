import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import LimitBanner from "@/components/LimitBanner";

export default function HomeScreen() {
  const { products, deleteProduct, canAddProduct, productCount, MAX_PRODUCTS } =
    useProducts();

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      "Delete Product",
      `Are you sure you want to remove "${name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteProduct(id),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Counter Badge */}
      <View style={styles.counterRow}>
        <View style={styles.counterBadge}>
          <Ionicons name="cube-outline" size={16} color="#6C63FF" />
          <Text style={styles.counterText}>
            {productCount} / {MAX_PRODUCTS} products
          </Text>
        </View>
      </View>

      {/* Limit Banner */}
      {!canAddProduct && <LimitBanner />}

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState />}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onDelete={() => handleDelete(item.id, item.name)}
            onPress={() => router.push(`/product/${item.id}`)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB Add Button */}
      <TouchableOpacity
        style={[styles.fab, !canAddProduct && styles.fabDisabled]}
        onPress={() => {
          if (!canAddProduct) {
            Alert.alert(
              "Limit Reached",
              "You can only add up to 5 products. Delete one to add more."
            );
            return;
          }
          router.push("/add-product");
        }}
        activeOpacity={0.85}
      >
        <Ionicons
          name={canAddProduct ? "add" : "lock-closed"}
          size={28}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F4FF" },
  counterRow: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
    alignItems: "flex-start",
  },
  counterBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDE9FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  counterText: { color: "#6C63FF", fontWeight: "600", fontSize: 13 },
  list: { padding: 16, paddingBottom: 100 },
  fab: {
    position: "absolute",
    bottom: 32,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6C63FF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6C63FF",
    shadowOpacity: 0.45,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  fabDisabled: { backgroundColor: "#C4C0E8" },
});
