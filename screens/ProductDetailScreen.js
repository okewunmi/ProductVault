import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProducts } from '../context/ProductContext';
import { COLORS, SPACING, RADIUS } from '../components/theme';

export default function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;
  const { products, deleteProduct } = useProducts();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={{ textAlign: 'center', marginTop: 40, color: COLORS.textSecondary }}>
          Product not found.
        </Text>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert('Delete Product', `Remove "${product.name}" from your vault?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteProduct(product.id);
          navigation.goBack();
        },
      },
    ]);
  };

  const date = new Date(product.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Photo */}
        <Image source={{ uri: product.photo }} style={styles.photo} resizeMode="cover" />

        {/* Details Card */}
        <View style={styles.card}>
          <View style={styles.topRow}>
            <View style={styles.catBadge}>
              <Text style={styles.catText}>{product.category}</Text>
            </View>
            <Text style={styles.date}>Added {date}</Text>
          </View>

          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price}</Text>

          <View style={styles.divider} />

          <View style={styles.statsRow}>
            <StatBox icon="🏷️" label="Category" value={product.category} />
            <StatBox icon="💰" label="Price" value={`$${product.price}`} />
            <StatBox icon="📅" label="Added" value={new Date(product.createdAt).toLocaleDateString()} />
          </View>
        </View>
      </ScrollView>

      {/* Delete Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete} activeOpacity={0.85}>
          <Text style={styles.deleteBtnText}>🗑  Remove Product</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function StatBox({ icon, label, value }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  photo: {
    width: '100%',
    height: 300,
    backgroundColor: COLORS.primaryLight,
  },
  card: {
    backgroundColor: COLORS.white,
    margin: SPACING.md,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  catBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  catText: { color: COLORS.primary, fontSize: 12, fontWeight: '600' },
  date: { color: COLORS.textMuted, fontSize: 12 },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.lg,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: { alignItems: 'center', flex: 1 },
  statIcon: { fontSize: 22, marginBottom: 4 },
  statValue: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary },
  statLabel: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  footer: {
    padding: SPACING.md,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  deleteBtn: {
    backgroundColor: '#FFF0F0',
    borderRadius: RADIUS.lg,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.danger,
  },
  deleteBtnText: {
    color: COLORS.danger,
    fontSize: 15,
    fontWeight: '700',
  },
});
