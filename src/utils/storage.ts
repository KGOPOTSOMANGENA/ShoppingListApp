import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item } from '../types/Item';

export const saveItems = async (items: Item[]) => {
  try {
    await AsyncStorage.setItem('SHOPPING_ITEMS', JSON.stringify(items));
  } catch (error) {
    console.log('Error saving items:', error);
  }
};

export const loadItems = async (): Promise<Item[]> => {
  try {
    const data = await AsyncStorage.getItem('SHOPPING_ITEMS');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('Error loading items:', error);
    return [];
  }
};
