'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { NavLinkDescriptionsDefault } from '@/components/navigation/navLinkDescriptions';
import { motion } from 'framer-motion';
import {
  NavigationType,
  navLinkIcons
} from '@/components/navigation/navLinkIcons';
import { PropsWithChildren, ReactNode, useRef, useState } from 'react';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Popper,
  ClickAwayListener
} from '@mui/material';
import PopoverFloatingUi from '@/components/generic/PopoverFloatingUi';

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
  const buttonRef = useRef(null);

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  return (
    <>
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
                  {/*<Popover*/}
                  {/*  triggerScaleOnOpen={false}*/}
                  {/*  onOpenChange={setPopoverOpen}*/}
                  {/*  isOpen={popoverOpen}*/}
                  {/*>*/}
                  {/*  <PopoverTrigger>*/}
                  <ClickAwayListener
                    onClickAway={() => {
                      console.log({ popoverOpen });
                      setPopoverOpen(false);
                    }}
                  >
                    <Button
                      ref={buttonRef}
                      className={
                        'w-full justify-between rounded-none italic text-default-500'
                      }
                      onClick={(e) => {
                        setParentElement(buttonRef.current);
                        setPopoverOpen((prev) => !prev);
                      }}
                    >
                      <>
                        {Icon && <Icon className={'h-8 w-8'} />}
                        {displayHeader}
                      </>
                    </Button>
                    {/*</PopoverTrigger>*/}
                  </ClickAwayListener>
                  {/*</Popover>*/}
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
      <PopoverFloatingUi open={popoverOpen} parentElementRef={parentElement}>
        <Card
          className={
            'm-2 max-w-lg bg-white p-2 font-normal not-italic drop-shadow-xl'
          }
        >
          {navigationType && navLinkDescription}
        </Card>
      </PopoverFloatingUi>
    </>
  );
}
