'use client';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const sizeClassName =
    pathname.split('/').pop() === 'thing' ? 'w-72 h-72' : 'w-44 h-44';
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current++;
    console.log(renderCount.current); // KEEP LOG
  });

  return (
    <motion.div className={clsx(sizeClassName)} layout>
      {children}
    </motion.div>
  );
}
