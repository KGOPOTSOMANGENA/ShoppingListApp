import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Item } from '../types/Item';
import { useDispatch } from 'react-redux';
import { deleteItem, togglePurchased } from '../redux/itemsSlice';

interface Props {
  item: Item;
  onEdit: () => void;
}

export default function ItemCard({ item, onEdit }: Props) {
  const dispatch = useDispatch();

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => dispatch(togglePurchased(item.id))}>
        <Text style={[styles.text, item.purchased && styles.purchased]}>
          {item.name} (x{item.quantity})
        </Text>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => dispatch(deleteItem(item.id))}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  text: { fontSize: 16, fontWeight: '600' },
  purchased: { textDecorationLine: 'line-through', color: '#888' },
  actions: { flexDirection: 'row', gap: 10 },
  edit: { color: '#2980b9', fontWeight: '700' },
  delete: { color: '#e74c3c', fontWeight: '700' },
});
