import React from 'react';
import { motion } from 'framer-motion';

const CategoriesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Categories</h1>
        <p className="text-gray-600">Categories page coming soon...</p>
      </div>
    </motion.div>
  );
};

export default CategoriesPage;