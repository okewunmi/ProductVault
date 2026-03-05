import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useProducts } from "@/context/ProductContext";

export default function AddProductScreen() {
  const { addProduct, canAddProduct } = useProducts();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; price?: string }>({});

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Please allow access to your photos.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Please allow camera access.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const showImageOptions = () => {
    Alert.alert("Add Photo", "Choose a source", [
      { text: "Camera", onPress: takePhoto },
      { text: "Photo Library", onPress: pickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const validate = () => {
    const newErrors: { name?: string; price?: string } = {};
    if (!name.trim()) newErrors.name = "Product name is required.";
    else if (name.trim().length < 2) newErrors.name = "Name is too short.";

    if (!price.trim()) newErrors.price = "Price is required.";
    else if (isNaN(Number(price)) || Number(price) <= 0)
      newErrors.price = "Enter a valid positive price.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!canAddProduct) return;
    if (!validate()) return;
    setLoading(true);
    await addProduct({ name: name.trim(), price: price.trim(), photo });
    setLoading(false);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Photo Picker */}
        <TouchableOpacity style={styles.photoPicker} onPress={showImageOptions}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photoPreview} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Ionicons name="camera-outline" size={40} color="#A89DFF" />
              <Text style={styles.photoHint}>Tap to add photo</Text>
            </View>
          )}
          <View style={styles.photoEditBadge}>
            <Ionicons name="pencil" size={14} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Name Field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Product Name *</Text>
          <TextInput
            style={[styles.input, errors.name ? styles.inputError : null]}
            placeholder="e.g. Wireless Earbuds"
            placeholderTextColor="#C0B8FF"
            value={name}
            onChangeText={(t) => {
              setName(t);
              if (errors.name) setErrors((e) => ({ ...e, name: undefined }));
            }}
            maxLength={60}
            returnKeyType="next"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        {/* Price Field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Price (USD) *</Text>
          <View style={styles.priceRow}>
            <View style={styles.currencyBadge}>
              <Text style={styles.currencySymbol}>$</Text>
            </View>
            <TextInput
              style={[
                styles.input,
                styles.priceInput,
                errors.price ? styles.inputError : null,
              ]}
              placeholder="0.00"
              placeholderTextColor="#C0B8FF"
              value={price}
              onChangeText={(t) => {
                setPrice(t);
                if (errors.price) setErrors((e) => ({ ...e, price: undefined }));
              }}
              keyboardType="decimal-pad"
              returnKeyType="done"
            />
          </View>
          {errors.price && (
            <Text style={styles.errorText}>{errors.price}</Text>
          )}
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveBtn, loading && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
              <Text style={styles.saveBtnText}>Save Product</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F4FF" },
  content: { padding: 24, paddingBottom: 48 },
  photoPicker: {
    alignSelf: "center",
    marginBottom: 32,
    position: "relative",
  },
  photoPreview: {
    width: 140,
    height: 140,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#6C63FF",
  },
  photoPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 20,
    backgroundColor: "#EDE9FF",
    borderWidth: 2,
    borderColor: "#C4BEFF",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  photoHint: { color: "#A89DFF", fontSize: 13, fontWeight: "500" },
  photoEditBadge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    backgroundColor: "#6C63FF",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  fieldGroup: { marginBottom: 20 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3D3580",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#2D2560",
    borderWidth: 1.5,
    borderColor: "#DDD9FF",
  },
  inputError: { borderColor: "#FF6B6B" },
  errorText: { color: "#FF6B6B", fontSize: 12, marginTop: 4, marginLeft: 4 },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  currencyBadge: {
    backgroundColor: "#6C63FF",
    width: 46,
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  currencySymbol: { color: "#fff", fontSize: 20, fontWeight: "700" },
  priceInput: { flex: 1 },
  saveBtn: {
    backgroundColor: "#6C63FF",
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
    shadowColor: "#6C63FF",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  saveBtnDisabled: { backgroundColor: "#A89DFF" },
  saveBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  cancelBtn: { alignItems: "center", marginTop: 16, paddingVertical: 8 },
  cancelBtnText: { color: "#A89DFF", fontSize: 15, fontWeight: "500" },
});
