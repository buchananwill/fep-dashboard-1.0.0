'use client';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FrozenRouter } from '@/components/generic/FrozenRouter';

export default function CoreLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode={'popLayout'}>
      <motion.div key={pathname}>
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
