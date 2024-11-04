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
  navigationType,
  shrinkWrap
}: {
  layoutId: string;
  navigationType?: NavigationType;
  displayHeader?: string | ReactNode;
  shrinkWrap?: boolean;
} & PropsWithChildren) {
  const Icon = navigationType ? navLinkIcons[navigationType] : null;
  const navLinkDescription = navigationType
    ? NavLinkDescriptionsDefault[navigationType]
    : null;

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
                <Popover>
                  <div className={'w-full overflow-hidden rounded-t-2xl'}>
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
                  </div>
                  <Popover.Dropdown className={'max-w-lg'}>
                    {navigationType && navLinkDescription}
                  </Popover.Dropdown>
                </Popover>
              </Card.Section>
            ) : (
              <Card.Section
                className={'border-default-200 flex justify-between '}
              >
                {Icon && <Icon className={'h-8 w-8'} />}
                <h1 className={'p-2'}>{displayHeader}</h1>
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
