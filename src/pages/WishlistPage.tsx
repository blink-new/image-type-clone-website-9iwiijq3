import React from 'react';
import { motion } from 'framer-motion';

const WishlistPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        <p className="text-gray-600">Wishlist page coming soon...</p>
      </div>
    </motion.div>
  );
};

export default WishlistPage;