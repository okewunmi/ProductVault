import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useProducts } from "@/context/ProductContext";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { products, deleteProduct } = useProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.notFound}>
        <Ionicons name="alert-circle-outline" size={60} color="#C4BEFF" />
        <Text style={styles.notFoundText}>Product not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Product",
      `Remove "${product.name}" from your vault?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteProduct(product.id);
            router.back();
          },
        },
      ]
    );
  };

  const formattedDate = new Date(product.createdAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Product Image */}
      <View style={styles.imageContainer}>
        {product.photo ? (
          <Image source={{ uri: product.photo }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="cube-outline" size={72} color="#A89DFF" />
          </View>
        )}
      </View>

      {/* Product Info Card */}
      <View style={styles.card}>
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.priceBadge}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>${parseFloat(product.price).toFixed(2)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.metaRow}>
          <Ionicons name="calendar-outline" size={16} color="#A89DFF" />
          <Text style={styles.metaText}>Added on {formattedDate}</Text>
        </View>

        <View style={styles.metaRow}>
          <Ionicons name="pricetag-outline" size={16} color="#A89DFF" />
          <Text style={styles.metaText}>ID: {product.id}</Text>
        </View>
      </View>

      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={handleDelete}
        activeOpacity={0.85}
      >
        <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
        <Text style={styles.deleteBtnText}>Delete Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F4FF" },
  content: { padding: 24, paddingBottom: 48 },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: "#F5F4FF",
  },
  notFoundText: { color: "#A89DFF", fontSize: 16 },
  backBtn: { marginTop: 8 },
  backBtnText: { color: "#6C63FF", fontWeight: "600" },
  imageContainer: { alignItems: "center", marginBottom: 24 },
  image: {
    width: 200,
    height: 200,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "#6C63FF",
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 24,
    backgroundColor: "#EDE9FF",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#6C63FF",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2D2560",
    marginBottom: 16,
  },
  priceBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F4FF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  priceLabel: { fontSize: 14, color: "#A89DFF", fontWeight: "500" },
  price: { fontSize: 28, fontWeight: "800", color: "#6C63FF" },
  divider: { height: 1, backgroundColor: "#EDE9FF", marginBottom: 16 },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  metaText: { color: "#7B72B8", fontSize: 13 },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#FF6B6B",
    backgroundColor: "#FFF5F5",
  },
  deleteBtnText: { color: "#FF6B6B", fontWeight: "700", fontSize: 15 },
});
