'use client';
import { NavLinkDescriptionsDefault } from '@/components/navigation/navLinkDescriptions';
import { motion } from 'framer-motion';
import {
  NavigationType,
  iconDefinitions
} from '@/components/navigation/iconDefinitions';
import { PropsWithChildren, ReactNode } from 'react';
import clsx from 'clsx';
import { Card, Button, Popover } from '@mantine/core';
import { EntityIcon } from '@/components/navigation/EntityIcon';
import { useUserGuideTooltip } from '@/components/user-guide/user-guide-tool-tip/UserGuideToolTip';

export default function RootCard({
  layoutId,
  displayHeader,
  children,
  navigationType,
  shrinkWrap
}: {
  layoutId: string;
  navigationType?: NavigationType;
  displayHeader?: string | ReactNode;
  shrinkWrap?: boolean;
} & PropsWithChildren) {
  const Icon = navigationType ? iconDefinitions[navigationType] : null;
  const navLinkDescription = navigationType
    ? NavLinkDescriptionsDefault[navigationType]
    : null;

  const userGuideTooltip = useUserGuideTooltip(navigationType ?? '');

  return (
    <motion.div
      layoutId={layoutId}
      className={'h-full'}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.8 }}
      layout
    >
      <motion.div
        className={'h-full'}
        layoutId={`${layoutId}-inner`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Card
          styles={{
            root: {
              overflow: 'visible',
              width: shrinkWrap ? 'fit-content' : '100%',
              height: shrinkWrap ? 'fit-content' : '100%'
            }
          }}
        >
          {displayHeader &&
            (navLinkDescription ? (
              <Card.Section>
                <div
                  style={{
                    backgroundColor: 'var(--mantine-color-secondary-1)',
                    color: 'var(--mantine-color-secondary-7)'
                  }}
                  className={
                    'flex w-full justify-between overflow-hidden rounded-t-2xl border-b p-1 pb-0'
                  }
                  {...userGuideTooltip}
                >
                  {navigationType && (
                    <EntityIcon
                      className={'h-8 w-8'}
                      entityName={navigationType}
                    />
                  )}
                  {displayHeader}
                </div>
              </Card.Section>
            ) : (
              <Card.Section
                className={'border-default-200 flex justify-between '}
              >
                {Icon && <Icon className={'h-8 w-8'} />}
                {displayHeader}
              </Card.Section>
            ))}
          <Card.Section
            className={clsx(displayHeader && 'pt-0', 'overflow-visible')}
          >
            {children}
          </Card.Section>
        </Card>
      </motion.div>
    </motion.div>
  );
}
