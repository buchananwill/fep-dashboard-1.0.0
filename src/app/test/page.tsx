'use client';
import { NavCards } from '@/app/test/cards';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { BASE_500 } from '@/components/react-flow/generic/utils/colors';

export default function page() {
  return (
    <div className={'grid grid-cols-2 gap-4'}>
      {NavCards.map((navCard) => {
        return (
          <Link href={navCard.path} key={navCard.path}>
            <motion.div
              layoutId={navCard.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: BASE_500.sky.cssHSLA,
                color: '#ffffff'
              }}
            >
              {navCard.displayName}
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
