'use client';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
