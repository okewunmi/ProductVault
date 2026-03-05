import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="cube-outline" size={52} color="#A89DFF" />
      </View>
      <Text style={styles.title}>No Products Yet</Text>
      <Text style={styles.subtitle}>
        Tap the + button below to add your first product. You can store up to 5.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 32,
    gap: 12,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#EDE9FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  title: { fontSize: 20, fontWeight: "800", color: "#3D3580" },
  subtitle: {
    fontSize: 14,
    color: "#A89DFF",
    textAlign: "center",
    lineHeight: 21,
  },
});
