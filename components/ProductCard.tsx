import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "@/context/ProductContext";

interface Props {
  product: Product;
  onDelete: () => void;
  onPress: () => void;
}

export default function ProductCard({ product, onDelete, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.88}
    >
      {/* Thumbnail */}
      <View style={styles.thumb}>
        {product.photo ? (
          <Image source={{ uri: product.photo }} style={styles.thumbImage} />
        ) : (
          <View style={styles.thumbPlaceholder}>
            <Ionicons name="cube-outline" size={28} color="#A89DFF" />
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.price}>
          ${parseFloat(product.price).toFixed(2)}
        </Text>
      </View>

      {/* Chevron + Delete */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={onDelete} hitSlop={10} style={styles.deleteBtn}>
          <Ionicons name="trash-outline" size={19} color="#FF9090" />
        </TouchableOpacity>
        <Ionicons name="chevron-forward" size={18} color="#C4BEFF" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#6C63FF",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    gap: 12,
  },
  thumb: { width: 58, height: 58, borderRadius: 12, overflow: "hidden" },
  thumbImage: { width: "100%", height: "100%" },
  thumbPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#EDE9FF",
    alignItems: "center",
    justifyContent: "center",
  },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: "700", color: "#2D2560", marginBottom: 4 },
  price: { fontSize: 14, fontWeight: "600", color: "#6C63FF" },
  actions: { flexDirection: "row", alignItems: "center", gap: 10 },
  deleteBtn: { padding: 4 },
});
