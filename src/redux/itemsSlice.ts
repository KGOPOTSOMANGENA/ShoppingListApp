import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../types/Item';

interface ItemsState {
  items: Item[];
}

const initialState: ItemsState = {
  items: [],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    updateItem: (
      state,
      action: PayloadAction<{ id: string; name: string; quantity: number; category?: string }>
    ) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.items[index].name = action.payload.name;
        state.items[index].quantity = action.payload.quantity;
        if (action.payload.category) {
          state.items[index].category = action.payload.category;
        }
      }
    },
    togglePurchased: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((i) => i.id === action.payload);
      if (index !== -1) {
        state.items[index].purchased = !state.items[index].purchased;
      }
    },
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addItem, deleteItem, updateItem, togglePurchased, setItems } =
  itemsSlice.actions;

export default itemsSlice.reducer;