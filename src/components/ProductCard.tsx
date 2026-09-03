'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  name: string;
  price: string;
  color: string;
  delay?: number;
}

export default function ProductCard({ name, price, color, delay = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${color} to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
      
      <div className="relative bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden backdrop-blur-sm">
        {/* Image placeholder with gradient */}
        <div className={`h-64 bg-gradient-to-br ${color} to-gray-900 flex items-center justify-center overflow-hidden`}>
          <motion.div
            animate={isHovered ? { scale: 1.1, rotateY: 5 } : { scale: 1, rotateY: 0 }}
            transition={{ duration: 0.3 }}
            className="text-white text-6xl opacity-30"
          >
            ⚙️
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-white">{name}</h3>
          <p className="text-gray-400 text-sm mb-4">
            Premium agricultural implement for modern farming operations.
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-6 text-sm text-gray-300">
            <li>✓ High Performance</li>
            <li>✓ Durable Build</li>
            <li>✓ Easy Maintenance</li>
          </ul>

          {/* Price and Button */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">{price}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg font-semibold bg-gradient-to-r ${color} to-transparent text-white transition-all hover:shadow-lg`}
            >
              Learn More
            </motion.button>
          </div>
        </div>

        {/* Shine effect */}
        {isHovered && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10"
          />
        )}
      </div>
    </motion.div>
  );
}