import { Button } from '@nextui-org/button';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import NavPopoverContent from '@/components/navigation/NavPopoverContent';
import clsx from 'clsx';

export default function NavPopoverTrigger() {
  return (
    <div
      className={
        'fixed bottom-0 left-1/2 z-40 rounded-t-full bg-white bg-opacity-75 p-2 pb-8'
      }
      style={{ transform: 'translate(-50%, 0%)' }}
    >
      <Popover>
        <PopoverTrigger>
          <Button
            isIconOnly={true}
            className={clsx('h-12 w-12 rounded-full p-1')}
            variant={'light'}
          >
            <GlobeAltIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <NavPopoverContent />
        </PopoverContent>
      </Popover>
    </div>
  );
}
