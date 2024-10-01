'use client';
import { LinkButton } from '@/components/navigation/LinkButton';
import { motion } from 'framer-motion';
import { NavCards } from '@/app/test/cards';

export default function page() {
  return (
    <motion.div
      layoutId={NavCards[0].path}
      className={'h-full rounded-lg bg-fuchsia-400'}
    >
      <LinkButton href={'/test/other-thing'}>Other thing</LinkButton>
    </motion.div>
  );
}
