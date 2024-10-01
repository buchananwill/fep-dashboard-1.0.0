import { LeafComponentProps, NavLinkTree } from '@/app/core/navigation/types';
import { Api } from '@/api/clientApi_';
import { NavLinkTreeButton } from '@/app/core/navigation/NavLinkTreeButton';
import { WrappedHeader } from '@/app/core/navigation/WrappedHeader';
import { WrappedLink } from '@/app/core/navigation/WrappedLink';
import { navLinkTreeFromKnowledgeLevelSeries } from '@/components/knowledge-levels/NavLinkTreeFromKnowledgeLevelSeries';
import {
  NavigationType,
  navKeyList
} from '@/components/navigation/navLinkIcons';
import { getFirstNVariables } from '@/components/work-task-types/getRootCardLayoutId';
import { camelCase } from 'lodash';

export function getNavIndex(searchElement: NavigationType) {
  return navKeyList.indexOf(searchElement);
}

export async function KnowledgeLevelSeriesLinks({
  pathVariables,
  depth
}: LeafComponentProps) {
  const useCaseName = pathVariables.join('-');

  const navIndex = getNavIndex(camelCase(useCaseName) as NavigationType);
  const all = await Api.KnowledgeLevelSeries.getAll().then((r) => {
    return Promise.all(
      r.map((levelSeries, index) =>
        navLinkTreeFromKnowledgeLevelSeries(
          levelSeries,
          index,
          pathVariables,
          depth + 1,
          navIndex
        )
      )
    );
  });

  const navTree: NavLinkTree = {
    displayName: useCaseName,
    children: all,
    indexList: [navIndex],
    link: ['core', ...pathVariables],
    disableLinkThisLevel: true
  };

  return (
    <div className={'p-4'}>
      <NavLinkTreeButton
        navLinkNode={navTree}
        renderHeaderAs={WrappedHeader}
        renderLinkAs={WrappedLink}
      />
    </div>
  );
}
