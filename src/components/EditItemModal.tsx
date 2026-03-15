import React, { useState, useEffect } from 'react';
import {
  Modal, View, Text, TextInput,
  TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { updateItem } from '../redux/itemsSlice';
import { Item } from '../types/Item';

interface Props {
  visible: boolean;
  item: Item | null;
  onClose: () => void;
}

const CATEGORIES = [
  { label: '🥦 Fresh Food', value: 'fresh' },
  { label: '🥛 Dairy', value: 'dairy' },
  { label: '🍞 Bakery', value: 'bakery' },
  { label: '🥩 Meat', value: 'meat' },
  { label: '🧴 Personal Care', value: 'personal' },
  { label: '🧹 Household', value: 'household' },
  { label: '🥫 Pantry', value: 'pantry' },
  { label: '🍬 Snacks', value: 'snacks' },
];

export default function EditItemModal({ visible, item, onClose }: Props) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [category, setCategory] = useState('fresh');
  const [error, setError] = useState('');

  useEffect(() => {
    if (item) {
      setName(item.name);
      setQty(String(item.quantity));
      setCategory(item.category ?? 'fresh');
    }
  }, [item]);

  const handleSave = () => {
    if (!name.trim()) { setError('Item name cannot be empty.'); return; }
    if (!item) return;
    setError('');
    dispatch(updateItem({ id: item.id, name: name.trim(), quantity: Number(qty || 1), category }));
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>Edit Item</Text>

          <TextInput
            style={[styles.input, !!error && styles.inputError]}
            placeholder="Item name..."
            placeholderTextColor="#A0A8B0"
            value={name}
            onChangeText={(t) => { setName(t); setError(''); }}
          />
          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Quantity"
            placeholderTextColor="#A0A8B0"
            keyboardType="numeric"
            value={qty}
            onChangeText={setQty}
          />

          <Text style={styles.sectionLabel}>CATEGORY</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            contentContainerStyle={styles.categoryContent}
          >
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.value}
                onPress={() => setCategory(cat.value)}
                style={[styles.chip, category === cat.value && styles.chipActive]}
              >
                <Text style={[styles.chipText, category === cat.value && styles.chipTextActive]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.row}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.8}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 36 },
  handle: { width: 40, height: 4, backgroundColor: '#E2E8F0', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: '800', color: '#1A202C', marginBottom: 18 },
  input: {
    backgroundColor: '#F2F4F6', padding: 13, borderRadius: 12,
    marginBottom: 12, fontSize: 15, color: '#1A202C',
    borderWidth: 1.5, borderColor: 'transparent',
  },
  inputError: { borderColor: '#e74c3c', backgroundColor: '#FEF0F0' },
  errorText: { fontSize: 13, color: '#e74c3c', fontWeight: '500', marginTop: -8, marginBottom: 10, marginLeft: 4 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: '#27ae60', letterSpacing: 1.2, marginBottom: 10, marginTop: 4 },
  categoryScroll: { marginBottom: 20 },
  categoryContent: { gap: 8, paddingRight: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, backgroundColor: '#F2F4F6', borderWidth: 1.5, borderColor: 'transparent' },
  chipActive: { backgroundColor: '#E8F8F0', borderColor: '#27ae60' },
  chipText: { fontSize: 13, color: '#6B7280', fontWeight: '500' },
  chipTextActive: { color: '#27ae60', fontWeight: '700' },
  row: { flexDirection: 'row', gap: 10 },
  cancelBtn: { flex: 1, padding: 14, backgroundColor: '#F2F4F6', borderRadius: 12, alignItems: 'center' },
  cancelText: { fontWeight: '600', color: '#6B7280', fontSize: 15 },
  saveBtn: { flex: 2, padding: 14, backgroundColor: '#27ae60', borderRadius: 12, alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});