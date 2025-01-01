import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FrozenRouter } from '@/components/generic/FrozenRouter';

export default function CoreLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
