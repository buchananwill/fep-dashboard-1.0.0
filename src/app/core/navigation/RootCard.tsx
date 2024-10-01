'use client';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import { NavLinkDescriptionsDefault } from '@/components/navigation/navLinkDescriptions';
import { NavLinkTree } from '@/app/core/navigation/types';
import { motion } from 'framer-motion';
import {
  NavigationType,
  navLinkIcons
} from '@/components/navigation/navLinkIcons';
import { PropsWithChildren } from 'react';

export default function RootCard({
  navLinkNode: { link, displayName, indexList },
  aliasName,
  children,
  navigationType
}: {
  navLinkNode: NavLinkTree;
  navigationType?: NavigationType;
  aliasName: string;
} & PropsWithChildren) {
  const Icon = navigationType ? navLinkIcons[navigationType] : null;

  return (
    <motion.div layoutId={displayName}>
      <Card className={'scale-in'}>
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
                {aliasName}
              </CardHeader>
            </Button>
          </PopoverTrigger>
          <PopoverContent className={'max-w-lg'}>
            {navigationType && NavLinkDescriptionsDefault[navigationType]}
          </PopoverContent>
        </Popover>
        <CardBody className={'pt-0'}>{children}</CardBody>
      </Card>
    </motion.div>
  );
}
