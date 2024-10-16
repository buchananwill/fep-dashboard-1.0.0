import { Button } from '@nextui-org/button';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import NavPopoverContent from '@/components/navigation/NavPopoverContent';
import clsx from 'clsx';
import { BoundaryCenteredWidget } from '@/components/generic/BoundaryCenteredWidget';
import { navigationBreadcrumbs } from '@/components/navigation/NavigationBreadcrumbs';

export default function NavPopoverTrigger() {
  return (
    <BoundaryCenteredWidget contentContextKey={navigationBreadcrumbs}>
      <Popover>
        <PopoverTrigger>
          <Button
            isIconOnly={true}
            className={clsx('h-12 w-12 rounded-full p-1 ')}
            variant={'light'}
            color={'primary'}
          >
            <GlobeAltIcon className={'text-black'} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <NavPopoverContent />
        </PopoverContent>
      </Popover>
    </BoundaryCenteredWidget>
  );
}
