import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/itemsSlice';
import uuid from 'react-native-uuid';

export default function AddItemInput() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');

  const handleAdd = () => {
    if (!name.trim()) return;

    dispatch(
      addItem({
        id: String(uuid.v4()),
        name,
        quantity: Number(qty || 1),
        purchased: false,
      })
    );

    setName('');
    setQty('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Item name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Qty"
        keyboardType="numeric"
        value={qty}
        onChangeText={setQty}
      />

      <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginBottom: 14, gap: 8 },
  input: {
    backgroundColor: '#EFEFEF',
    flex: 1,
    padding: 10,
    borderRadius: 8,
  },
  addBtn: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addText: { color: '#fff', fontWeight: '700' },
});
