import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, RADIUS } from './theme';

export default function ProductCard({ product, onPress, index }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      <Image source={{ uri: product.photo }} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <View style={styles.catBadge}>
          <Text style={styles.catText}>{product.category}</Text>
        </View>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
      <View style={styles.indexBadge}>
        <Text style={styles.indexText}>{index + 1}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.primaryLight,
  },
  info: {
    flex: 1,
    padding: SPACING.md,
    justifyContent: 'center',
  },
  catBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
    marginBottom: 6,
  },
  catText: { color: COLORS.primary, fontSize: 11, fontWeight: '600' },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
    lineHeight: 20,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  indexBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
  },
  indexText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 12,
  },
});
