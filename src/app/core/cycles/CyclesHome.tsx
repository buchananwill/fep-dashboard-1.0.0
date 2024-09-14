import { LeafComponentProps } from '@/app/core/navigation/types';
import { createLinksFromNavTree } from '@/app/core/navigation/createLinksFromNavTree';
import { cyclesNavTree } from '@/app/core/cycles/cyclesNavTree';
import { NavLinkTreeButton } from '@/app/core/navigation/NavLinkTreeButton';
import { WrappedHeader } from '@/app/core/navigation/WrappedHeader';
import { WrappedLink } from '@/app/core/navigation/WrappedLink';

const cycleLinks = createLinksFromNavTree(
  cyclesNavTree,
  ['core', 'cycles'],
  [1]
);
export default async function CyclesHome({}: LeafComponentProps) {
  return (
    <NavLinkTreeButton
      navLinkNode={cycleLinks}
      renderHeaderAs={WrappedHeader}
      renderLinkAs={WrappedLink}
    />
  );
}
