'use client';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import { NavLinkDescriptionsDefault } from '@/components/navigation/navLinkDescriptions';
import { motion } from 'framer-motion';
import {
  NavigationType,
  navLinkIcons
} from '@/components/navigation/navLinkIcons';
import { PropsWithChildren, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

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
  console.log(layoutId);
  const Icon = navigationType ? navLinkIcons[navigationType] : null;
  const navLinkDescription = navigationType
    ? NavLinkDescriptionsDefault[navigationType]
    : null;

  return (
    <motion.div
      layoutId={layoutId}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.7 }}
      layout
    >
      <Card className={'h-full'}>
        {displayHeader &&
          (navLinkDescription ? (
            <Popover triggerScaleOnOpen={false}>
              <PopoverTrigger>
                <Button
                  variant={'light'}
                  className={'rounded-none italic text-default-500'}
                >
                  <CardHeader
                    className={'flex justify-between  border-default-200 '}
                  >
                    {Icon && <Icon className={'h-8 w-8'} />}
                    {displayHeader}
                  </CardHeader>
                </Button>
              </PopoverTrigger>
              <PopoverContent className={'max-w-lg'}>
                {navigationType && navLinkDescription}
              </PopoverContent>
            </Popover>
          ) : (
            <CardHeader className={'flex justify-between  border-default-200 '}>
              {Icon && <Icon className={'h-8 w-8'} />}
              {displayHeader}
            </CardHeader>
          ))}
        <CardBody className={clsx(displayHeader && 'pt-0')}>
          {children}
        </CardBody>
      </Card>
    </motion.div>
  );
}
