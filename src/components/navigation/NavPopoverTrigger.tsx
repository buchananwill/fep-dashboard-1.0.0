import NavPopoverContent from '@/components/navigation/NavPopoverContent';
import { BoundaryCenteredWidget } from '@/components/generic/BoundaryCenteredWidget';
import { navigationBreadcrumbs } from '@/components/navigation/NavigationBreadcrumbs';
import NavPopover from '@/components/navigation/NavPopover';

export default function NavPopoverTrigger() {
  return (
    <BoundaryCenteredWidget contentContextKey={navigationBreadcrumbs}>
      <NavPopover>
        <NavPopoverContent />
      </NavPopover>
    </BoundaryCenteredWidget>
  );
}
