import { LeafComponentProps, NavLinkTree } from '@/app/core/navigation/types';
import { createLinksFromNavTree } from '@/app/core/navigation/createLinksFromNavTree';
import { cyclesNavTree } from '@/app/core/cycles/cyclesNavTree';
import { NavLinkTreeButton } from '@/app/core/navigation/NavLinkTreeButton';
import { WrappedHeader } from '@/app/core/navigation/WrappedHeader';
import { WrappedLink } from '@/app/core/navigation/WrappedLink';
import { getNavIndex } from '@/components/knowledge-levels/KnowledgeLevelSeriesLinks';

const cycleLinks: NavLinkTree = {
  ...createLinksFromNavTree(
    { children: cyclesNavTree },
    ['core', 'cycles'],
    [getNavIndex('cycles')]
  ),
  link: ['core', 'cycles'],
  disableLinkThisLevel: true
};
export default async function CyclesHome({
  pathVariables
}: LeafComponentProps) {
  return (
    <div className={'p-4'}>
      <NavLinkTreeButton
        navLinkNode={cycleLinks}
        renderHeaderAs={WrappedHeader}
        renderLinkAs={WrappedLink}
      />
    </div>
  );
}
