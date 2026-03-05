import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from './theme';

export default function LimitBanner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.icon}>🚫</Text>
      <View style={styles.textBlock}>
        <Text style={styles.title}>Product Limit Reached</Text>
        <Text style={styles.sub}>Delete a product to add a new one.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4F4',
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.danger,
  },
  icon: { fontSize: 22, marginRight: SPACING.sm },
  textBlock: { flex: 1 },
  title: { fontWeight: '700', color: COLORS.danger, fontSize: 14 },
  sub: { color: COLORS.textSecondary, fontSize: 12, marginTop: 2 },
});
