import { createLinksFromNavTree } from '@/app/core/navigation/createLinksFromNavTree';
import { NavLinkTreeButton } from '@/app/core/navigation/NavLinkTreeButton';
import { WrappedHeader } from '@/app/core/navigation/WrappedHeader';
import { WrappedLink } from '@/app/core/navigation/WrappedLink';
import { scheduleChildren } from '@/app/core/schedules/scheduleChildren';

const links = createLinksFromNavTree(
  { children: scheduleChildren },
  ['core', 'schedules'],
  [16]
);

export default function SchedulesHomePage() {
  return (
    <NavLinkTreeButton
      navLinkNode={links}
      renderHeaderAs={WrappedHeader}
      renderLinkAs={WrappedLink}
    />
  );
}
