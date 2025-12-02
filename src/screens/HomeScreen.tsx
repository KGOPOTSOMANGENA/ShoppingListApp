import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setItems } from '../redux/itemsSlice';
import { loadItems, saveItems } from '../utils/storage';

import AddItemInput from '../components/AddItemInput';
import ItemCard from '../components/ItemCard';
import EditItemModal from '../components/EditItemModal';
import { Item } from '../types/Item';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.items.items);

  const [editing, setEditing] = useState<Item | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Load data on startup
  useEffect(() => {
    (async () => {
      const stored = await loadItems();
      dispatch(setItems(stored));
    })();
  }, []);

  // Save whenever items change
  useEffect(() => {
    saveItems(items);
  }, [items]);

  const openEdit = (item: Item) => {
    setEditing(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Shopping List</Text>

      <AddItemInput />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} onEdit={() => openEdit(item)} />}
      />

      <EditItemModal
        visible={modalVisible}
        item={editing}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F7F7F7' },
  header: { fontSize: 26, fontWeight: '800', marginBottom: 16 },
});
