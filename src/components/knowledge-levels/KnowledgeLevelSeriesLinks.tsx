import { LeafComponentProps, NavLinkTree } from '@/app/core/navigation/types';
import { Api } from '@/api/clientApi_';
import { NavLinkTreeButton } from '@/app/core/navigation/NavLinkTreeButton';
import { WrappedHeader } from '@/app/core/navigation/WrappedHeader';
import { WrappedLink } from '@/app/core/navigation/WrappedLink';
import { navLinkTreeFromKnowledgeLevelSeries } from '@/components/knowledge-levels/NavLinkTreeFromKnowledgeLevelSeries';

export async function KnowledgeLevelSeriesLinks({
  pathVariables,
  depth
}: LeafComponentProps) {
  const all = await Api.KnowledgeLevelSeries.getAll().then((r) => {
    return Promise.all(
      r.map((levelSeries, index) =>
        navLinkTreeFromKnowledgeLevelSeries(
          levelSeries,
          index,
          pathVariables,
          depth
        )
      )
    );
  });

  const navTree: NavLinkTree = {
    displayName: 'knowledgeLevelSeries',
    children: all,
    indexList: []
  };

  return (
    <div className={'flex gap-2'}>
      <NavLinkTreeButton
        navLinkNode={navTree}
        renderHeaderAs={WrappedHeader}
        renderLinkAs={WrappedLink}
      />
    </div>
  );
}

