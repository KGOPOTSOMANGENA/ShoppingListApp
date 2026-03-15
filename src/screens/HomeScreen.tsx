import React, { useEffect, useState } from 'react';
import {
  View, FlatList, StyleSheet, Text,
  ScrollView, TouchableOpacity, StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setItems } from '../redux/itemsSlice';
import { loadItems, saveItems } from '../utils/storage';

import AddItemInput from '../components/AddItemInput';
import ItemCard from '../components/ItemCard';
import EditItemModal from '../components/EditItemModal';
import { Item } from '../types/Item';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: '🥦 Fresh', value: 'fresh' },
  { label: '🥛 Dairy', value: 'dairy' },
  { label: '🍞 Bakery', value: 'bakery' },
  { label: '🥩 Meat', value: 'meat' },
  { label: '🧴 Care', value: 'personal' },
  { label: '🧹 Home', value: 'household' },
  { label: '🥫 Pantry', value: 'pantry' },
  { label: '🍬 Snacks', value: 'snacks' },
];

export default function HomeScreen() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.items.items);

  const [editing, setEditing] = useState<Item | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    (async () => {
      const stored = await loadItems();
      dispatch(setItems(stored));
    })();
  }, []);

  useEffect(() => {
    saveItems(items);
  }, [items]);

  const openEdit = (item: Item) => {
    setEditing(item);
    setModalVisible(true);
  };

  const filteredItems =
    activeFilter === 'all' ? items : items.filter((i) => i.category === activeFilter);

  const purchasedCount = items.filter((i) => i.purchased).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Shopping List</Text>
          <Text style={styles.headerSub}>
            {items.length === 0
              ? 'Your list is empty'
              : `${purchasedCount} of ${items.length} items done`}
          </Text>
        </View>
        {items.length > 0 && (
          <View style={styles.progressPill}>
            <View style={[styles.progressFill, { width: `${(purchasedCount / items.length) * 100}%` as any }]} />
            <Text style={styles.progressText}>
              {Math.round((purchasedCount / items.length) * 100)}%
            </Text>
          </View>
        )}
      </View>

      <AddItemInput />

      {items.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {FILTERS.map((f) => {
            const count = f.value === 'all' ? items.length : items.filter((i) => i.category === f.value).length;
            if (f.value !== 'all' && count === 0) return null;
            return (
              <TouchableOpacity
                key={f.value}
                onPress={() => setActiveFilter(f.value)}
                style={[styles.filterTab, activeFilter === f.value && styles.filterTabActive]}
              >
                <Text style={[styles.filterTabText, activeFilter === f.value && styles.filterTabTextActive]}>
                  {f.label}
                </Text>
                <View style={[styles.filterCount, activeFilter === f.value && styles.filterCountActive]}>
                  <Text style={[styles.filterCountText, activeFilter === f.value && styles.filterCountTextActive]}>
                    {count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} onEdit={() => openEdit(item)} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyTitle}>
              {activeFilter === 'all' ? 'Your list is empty' : 'No items in this category'}
            </Text>
            <Text style={styles.emptySub}>
              {activeFilter === 'all'
                ? 'Add your first item above to get started!'
                : 'Switch to another category or add a new item.'}
            </Text>
          </View>
        }
      />

      <EditItemModal visible={modalVisible} item={editing} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA', paddingHorizontal: 16, paddingTop: 52 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#1A202C', letterSpacing: -0.5 },
  headerSub: { fontSize: 14, color: '#718096', marginTop: 2, fontWeight: '500' },
  progressPill: {
    width: 72, height: 36, backgroundColor: '#E8F8F0',
    borderRadius: 18, overflow: 'hidden', justifyContent: 'center', alignItems: 'center',
  },
  progressFill: { position: 'absolute', left: 0, top: 0, bottom: 0, backgroundColor: '#27ae60', borderRadius: 18 },
  progressText: { fontSize: 13, fontWeight: '700', color: '#1a7a47' },
  filterScroll: { marginBottom: 14 },
  filterContent: { gap: 8, paddingRight: 8 },
  filterTab: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20,
    backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#E2E8F0',
  },
  filterTabActive: { backgroundColor: '#27ae60', borderColor: '#27ae60' },
  filterTabText: { fontSize: 13, fontWeight: '600', color: '#718096' },
  filterTabTextActive: { color: '#fff' },
  filterCount: { backgroundColor: '#F2F4F6', width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  filterCountActive: { backgroundColor: 'rgba(255,255,255,0.3)' },
  filterCountText: { fontSize: 11, fontWeight: '700', color: '#718096' },
  filterCountTextActive: { color: '#ffffffbe' },
  listContent: { paddingBottom: 40 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 60, paddingHorizontal: 32 },
  emptyIcon: { fontSize: 56, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#2D3748', textAlign: 'center', marginBottom: 8 },
  emptySub: { fontSize: 14, color: '#718096', textAlign: 'center', lineHeight: 22 },
});