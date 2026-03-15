import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Item } from '../types/Item';
import { useDispatch } from 'react-redux';
import { deleteItem, togglePurchased } from '../redux/itemsSlice';

interface Props {
  item: Item;
  onEdit: () => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  fresh:     { bg: '#E8F8F0', text: '#1a7a47', dot: '#27ae60' },
  dairy:     { bg: '#EEF4FF', text: '#2a52be', dot: '#4a7dff' },
  bakery:    { bg: '#FFF7E6', text: '#92600a', dot: '#f5a623' },
  meat:      { bg: '#FEF0F0', text: '#9b2222', dot: '#e74c3c' },
  personal:  { bg: '#F3F0FF', text: '#5a3daa', dot: '#8b5cf6' },
  household: { bg: '#F0F9FF', text: '#0e6b92', dot: '#2980b9' },
  pantry:    { bg: '#FFF3E0', text: '#8d4b0e', dot: '#e67e22' },
  snacks:    { bg: '#FCF0F9', text: '#8b2478', dot: '#d63aaf' },
};

const CATEGORY_LABELS: Record<string, string> = {
  fresh: '🥦 Fresh', dairy: '🥛 Dairy', bakery: '🍞 Bakery',
  meat: '🥩 Meat', personal: '🧴 Care', household: '🧹 Home',
  pantry: '🥫 Pantry', snacks: '🍬 Snacks',
};

export default function ItemCard({ item, onEdit }: Props) {
  const dispatch = useDispatch();
  const cat = CATEGORY_COLORS[item.category ?? 'fresh'] ?? CATEGORY_COLORS.fresh;

  return (
    <View style={[styles.card, item.purchased && styles.cardPurchased]}>
      <TouchableOpacity
        onPress={() => dispatch(togglePurchased(item.id))}
        style={[styles.checkbox, item.purchased && styles.checkboxChecked]}
        activeOpacity={0.8}
      >
        {item.purchased && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={[styles.name, item.purchased && styles.namePurchased]} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.metaRow}>
          <View style={[styles.categoryPill, { backgroundColor: cat.bg }]}>
            <View style={[styles.categoryDot, { backgroundColor: cat.dot }]} />
            <Text style={[styles.categoryLabel, { color: cat.text }]}>
              {CATEGORY_LABELS[item.category ?? 'fresh'] ?? item.category}
            </Text>
          </View>
          <View style={styles.qtyPill}>
            <Text style={styles.qtyText}>×{item.quantity}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.actionBtn} activeOpacity={0.8}>
          <Text style={styles.editIcon}>✎</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(deleteItem(item.id))}
          style={[styles.actionBtn, styles.deleteBtn]}
          activeOpacity={0.8}
        >
          <Text style={styles.deleteIcon}>🗑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardPurchased: { opacity: 0.6, backgroundColor: '#FAFAFA' },
  checkbox: {
    width: 24, height: 24, borderRadius: 7,
    borderWidth: 2, borderColor: '#CBD5E0',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: { backgroundColor: '#27ae60', borderColor: '#27ae60' },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: '700', lineHeight: 16 },
  info: { flex: 1, gap: 6 },
  name: { fontSize: 16, fontWeight: '600', color: '#1A202C' },
  namePurchased: { textDecorationLine: 'line-through', color: '#9CA3AF' },
  metaRow: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  categoryPill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20,
  },
  categoryDot: { width: 6, height: 6, borderRadius: 3 },
  categoryLabel: { fontSize: 12, fontWeight: '600' },
  qtyPill: { backgroundColor: '#F2F4F6', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  qtyText: { fontSize: 12, fontWeight: '600', color: '#6B7280' },
  actions: { flexDirection: 'row', gap: 6 },
  actionBtn: {
    width: 34, height: 34, borderRadius: 9,
    backgroundColor: '#F2F4F6',
    alignItems: 'center', justifyContent: 'center',
  },
  deleteBtn: { backgroundColor: '#FEF0F0' },
  editIcon: { fontSize: 15, color: '#2980b9' },
  deleteIcon: { fontSize: 14 },
});