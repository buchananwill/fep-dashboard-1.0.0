import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import clsx from 'clsx';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import SessionPopoverContent from '@/components/auth/SessionPopoverContent';

export default function SessionButton() {
  return (
    <div
      className={
        'fixed bottom-0 left-4 z-40 rounded-t-full bg-white bg-opacity-75 p-2 pb-4'
      }
    >
      <Popover>
        <PopoverTrigger>
          <Button
            isIconOnly={true}
            className={clsx('h-12 w-12 rounded-full p-1')}
            variant={'light'}
          >
            <UserCircleIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <SessionPopoverContent />
        </PopoverContent>
      </Popover>
    </div>
  );
}
