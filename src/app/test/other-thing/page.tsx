'use client';
import { motion } from 'framer-motion';
import { LinkButton } from '@/components/navigation/LinkButton';
import { BASE_500 } from '@/components/react-flow/generic/utils/colors';
import { NavCards } from '@/app/test/cards';

export default function page() {
  return (
    <motion.div
      layoutId={NavCards[1].path}
      className={'h-full rounded-lg '}
      style={{ backgroundColor: BASE_500.emerald.cssHSLA }}
    >
      <LinkButton href={'/test/thing'}>thing</LinkButton>
      <LinkButton href={'/test'}>test</LinkButton>
    </motion.div>
  );
}
