import { createLinksFromNavTree } from '@/app/core/navigation/links/createLinksFromNavTree';
import { NavLinkTreeButton } from '@/app/core/navigation/links/NavLinkTreeButton';
import { WrappedHeader } from '@/app/core/navigation/links/WrappedHeader';
import { WrappedLink } from '@/app/core/navigation/links/WrappedLink';
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
