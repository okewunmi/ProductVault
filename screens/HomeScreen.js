import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';
import LimitBanner from '../components/LimitBanner';
import { COLORS, SPACING, RADIUS, MAX_PRODUCTS } from '../components/theme';

export default function HomeScreen({ navigation }) {
  const { products, isLimitReached } = useProducts();
  const count = products.length;
  const progress = count / MAX_PRODUCTS;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>ProductVault</Text>
          <Text style={styles.headerSub}>Your product catalogue</Text>
        </View>
        <TouchableOpacity
          style={[styles.addBtn, isLimitReached && styles.addBtnDisabled]}
          onPress={() => navigation.navigate('AddProduct')}
          disabled={isLimitReached}
          activeOpacity={0.85}
        >
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* Capacity Bar */}
      <View style={styles.capacityRow}>
        <Text style={styles.capacityLabel}>
          {count} / {MAX_PRODUCTS} products
        </Text>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress * 100}%`,
                backgroundColor:
                  progress >= 1
                    ? COLORS.danger
                    : progress >= 0.6
                    ? COLORS.warning
                    : COLORS.success,
              },
            ]}
          />
        </View>
      </View>

      {isLimitReached && <LimitBanner />}

      {/* List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState onAdd={() => navigation.navigate('AddProduct')} />}
        renderItem={({ item, index }) => (
          <ProductCard
            product={item}
            index={index}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 0.3,
  },
  headerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  addBtn: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  addBtnDisabled: {
    opacity: 0.45,
  },
  addBtnText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  capacityRow: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.primary,
  },
  capacityLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginBottom: 6,
    fontWeight: '500',
  },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: RADIUS.full,
  },
  list: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    minHeight: '100%',
  },
});
