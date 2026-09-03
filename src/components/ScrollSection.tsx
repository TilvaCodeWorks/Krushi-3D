'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollSectionProps {
  children: ReactNode;
  delay?: number;
}

export default function ScrollSection({ children, delay = 0 }: ScrollSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: 'easeOut'
      }}
      viewport={{
        once: false,
        amount: 0.3
      }}
    >
      {children}
    </motion.div>
  );
}