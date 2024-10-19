'use client';
import { NavLinkDescriptionsDefault } from '@/components/navigation/navLinkDescriptions';
import { motion } from 'framer-motion';
import {
  NavigationType,
  navLinkIcons
} from '@/components/navigation/navLinkIcons';
import { PropsWithChildren, ReactNode } from 'react';
import clsx from 'clsx';
import { Card, Button, Popover } from '@mantine/core';

export default function RootCard({
  layoutId,
  displayHeader,
  children,
  navigationType
}: {
  layoutId: string;
  navigationType?: NavigationType;
  displayHeader?: string | ReactNode;
} & PropsWithChildren) {
  const Icon = navigationType ? navLinkIcons[navigationType] : null;
  const navLinkDescription = navigationType
    ? NavLinkDescriptionsDefault[navigationType]
    : null;

  return (
    <motion.div
      layoutId={layoutId}
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
          className={'h-full'}
          styles={{
            root: {
              overflow: 'visible'
            }
          }}
        >
          {displayHeader &&
            (navLinkDescription ? (
              <Card.Section>
                <Popover>
                  <Popover.Target>
                    <Button
                      variant={'subtle'}
                      styles={{
                        root: { borderRadius: '0px' }
                      }}
                      classNames={{
                        inner: 'w-full',
                        label:
                          'flex w-full justify-between p-1 italic text-default-500 font-weight-400 font-light'
                      }}
                      className={''}
                      fullWidth
                    >
                      {Icon && <Icon className={'h-8 w-8'} />}
                      {displayHeader}
                    </Button>
                  </Popover.Target>
                  <Popover.Dropdown className={'max-w-lg'}>
                    {navigationType && navLinkDescription}
                  </Popover.Dropdown>
                </Popover>
              </Card.Section>
            ) : (
              <Card.Section
                className={'flex justify-between  border-default-200 '}
              >
                {Icon && <Icon className={'h-8 w-8'} />}
                {displayHeader}
              </Card.Section>
            ))}
          <Card.Section
            className={clsx(displayHeader && 'overflow-visible pt-0')}
          >
            {children}
          </Card.Section>
        </Card>
      </motion.div>
    </motion.div>
  );
}
