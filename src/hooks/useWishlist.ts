import { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  
  const { state, addToWishlist, removeFromWishlist, clearWishlist, isInWishlist } = context;
  
  return {
    items: state.items,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistCount: () => state.items.length,
  };
};