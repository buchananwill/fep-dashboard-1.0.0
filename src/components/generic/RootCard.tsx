'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { NavLinkDescriptionsDefault } from '@/components/navigation/navLinkDescriptions';
import { motion } from 'framer-motion';
import {
  NavigationType,
  navLinkIcons
} from '@/components/navigation/navLinkIcons';
import { PropsWithChildren, ReactNode, useState } from 'react';
import clsx from 'clsx';
import { Card, CardHeader, CardContent, Button } from '@mui/material';

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

  const [popoverOpen, setPopoverOpen] = useState(false);

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
        <Card className={'h-full rounded-2xl'}>
          {displayHeader &&
            (navLinkDescription ? (
              <div
                className={'flex w-full  justify-between border-default-200'}
              >
                <Popover
                  triggerScaleOnOpen={false}
                  onOpenChange={setPopoverOpen}
                  isOpen={popoverOpen}
                >
                  <PopoverTrigger>
                    <Button
                      className={
                        'w-full justify-between rounded-none italic text-default-500'
                      }
                      onClick={() => setPopoverOpen(true)}
                    >
                      {Icon && <Icon className={'h-8 w-8'} />}
                      {displayHeader}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className={'max-w-lg'}>
                    {navigationType && navLinkDescription}
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <CardHeader
                className={'flex justify-between  border-default-200 '}
              >
                {Icon && <Icon className={'h-8 w-8'} />}
                {displayHeader}
              </CardHeader>
            ))}
          <CardContent className={clsx(displayHeader && 'pt-0')}>
            {children}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
