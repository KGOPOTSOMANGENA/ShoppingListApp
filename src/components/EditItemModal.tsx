import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { updateItem } from '../redux/itemsSlice';
import { Item } from '../types/Item';

interface Props {
  visible: boolean;
  item: Item | null;
  onClose: () => void;
}

export default function EditItemModal({ visible, item, onClose }: Props) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [qty, setQty] = useState('');

  useEffect(() => {
    if (item) {
      setName(item.name);
      setQty(String(item.quantity));
    }
  }, [item]);

  const handleSave = () => {
    if (!item) return;

    dispatch(updateItem({ id: item.id, name, quantity: Number(qty) }));
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Edit Item</Text>

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

          <View style={styles.row}>
            <TouchableOpacity style={styles.cancel} onPress={onClose}>
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.save} onPress={handleSave}>
              <Text style={{ color: '#fff' }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 20,
  },
  box: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 14 },
  input: {
    backgroundColor: '#F1F1F1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  row: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  cancel: { padding: 10, backgroundColor: '#ddd', borderRadius: 8 },
  save: { padding: 10, backgroundColor: '#27ae60', borderRadius: 8 },
});
