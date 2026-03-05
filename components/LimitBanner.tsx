import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LimitBanner() {
  return (
    <View style={styles.banner}>
      <Ionicons name="warning-outline" size={20} color="#FF8C00" />
      <Text style={styles.text}>
        Product limit reached! Delete a product to add a new one.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E0",
    marginHorizontal: 16,
    marginTop: 8,
    padding: 12,
    borderRadius: 12,
    gap: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#FF8C00",
  },
  text: { flex: 1, color: "#B35A00", fontSize: 13, fontWeight: "600" },
});
