import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem } from '@/types';
import { cartApi } from '@/lib/api';

interface CartStore {
  cart: Cart | null;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: null,
      isLoading: false,

      fetchCart: async () => {
        try {
          set({ isLoading: true });
          const response = await cartApi.get();
          set({ cart: response.data, isLoading: false });
        } catch (error) {
          console.error('Failed to fetch cart:', error);
          set({ isLoading: false });
        }
      },

      addToCart: async (productId: string, quantity: number) => {
        try {
          await cartApi.add({ productId, quantity });
          await get().fetchCart();
        } catch (error) {
          console.error('Failed to add to cart:', error);
          throw error;
        }
      },

      updateItem: async (itemId: string, quantity: number) => {
        try {
          await cartApi.updateItem(itemId, { quantity });
          await get().fetchCart();
        } catch (error) {
          console.error('Failed to update cart item:', error);
          throw error;
        }
      },

      removeItem: async (itemId: string) => {
        try {
          await cartApi.removeItem(itemId);
          await get().fetchCart();
        } catch (error) {
          console.error('Failed to remove cart item:', error);
          throw error;
        }
      },

      clearCart: async () => {
        try {
          await cartApi.clear();
          set({ cart: null });
        } catch (error) {
          console.error('Failed to clear cart:', error);
          throw error;
        }
      },

      getTotalItems: () => {
        const cart = get().cart;
        if (!cart) return 0;
        return cart.items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotalPrice: () => {
        const cart = get().cart;
        if (!cart) return 0;
        return cart.items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
