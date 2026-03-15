import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/itemsSlice';
import uuid from 'react-native-uuid';

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

export default function AddItemInput() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('fresh');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!name.trim()) {
      setError('Please enter an item name.');
      return;
    }
    setError('');
    dispatch(
      addItem({
        id: String(uuid.v4()),
        name: name.trim(),
        quantity: Number(qty || 1),
        purchased: false,
        category: selectedCategory,
      })
    );
    setName('');
    setQty('');
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionLabel}>ADD ITEM</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.value}
            onPress={() => setSelectedCategory(cat.value)}
            style={[styles.chip, selectedCategory === cat.value && styles.chipActive]}
          >
            <Text style={[styles.chipText, selectedCategory === cat.value && styles.chipTextActive]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, styles.inputFlex]}
          placeholder="Item name..."
          placeholderTextColor="#A0A8B0"
          value={name}
          onChangeText={(t) => { setName(t); if (error) setError(''); }}
          returnKeyType="done"
          onSubmitEditing={handleAdd}
        />
        <TextInput
          style={[styles.input, styles.inputQty]}
          placeholder="Qty"
          placeholderTextColor="#A0A8B0"
          keyboardType="numeric"
          value={qty}
          onChangeText={setQty}
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd} activeOpacity={0.85}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#27ae60',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  categoryScroll: { marginBottom: 12 },
  categoryContent: { gap: 8, paddingRight: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F2F4F6',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  chipActive: {
    backgroundColor: '#E8F8F0',
    borderColor: '#27ae60',
  },
  chipText: { fontSize: 13, color: '#6B7280', fontWeight: '500' },
  chipTextActive: { color: '#27ae60', fontWeight: '700' },
  inputRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  input: {
    backgroundColor: '#F2F4F6',
    padding: 12,
    borderRadius: 12,
    fontSize: 15,
    color: '#1A202C',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  inputFlex: { flex: 1 },
  inputQty: { width: 64, textAlign: 'center' },
  addBtn: {
    backgroundColor: '#27ae60',
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: { color: '#fff', fontSize: 26, fontWeight: '300', lineHeight: 30 },
  errorText: { marginTop: 8, fontSize: 13, color: '#e74c3c', fontWeight: '500' },
});