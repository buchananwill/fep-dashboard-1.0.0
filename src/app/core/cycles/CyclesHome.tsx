import { NavLinkTree } from '@/app/core/navigation/links/types';
import { createLinksFromNavTree } from '@/app/core/navigation/links/createLinksFromNavTree';
import { cyclesNavTree } from '@/app/core/cycles/cyclesNavTree';
import { NavLinkTreeButton } from '@/app/core/navigation/links/NavLinkTreeButton';
import { WrappedHeader } from '@/app/core/navigation/links/WrappedHeader';
import { WrappedLink } from '@/app/core/navigation/links/WrappedLink';
import { getNavIndex } from '@/components/knowledge-levels/KnowledgeLevelSeriesLinks';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

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
