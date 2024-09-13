import { LeafComponentProps, NavLinkTree } from '@/app/core/navigation/types';
import { Api } from '@/api/clientApi_';
import { getCoreEntityLink } from '@/app/service-categories/ServiceCategoriesHome';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { startCase } from 'lodash';
import { LinkButton } from '@/app/service-categories/LinkButton';
import { getDomainAlias } from '@/api/getDomainAlias';
import { KnowledgeLevelSeriesDto } from '@/api/generated-types/generated-types';
import { NavLinkTreeButton } from '@/app/core/navigation/NavLinkTreeButton';
import { WrappedHeader } from '@/app/core/navigation/WrappedHeader';
import { WrappedLink } from '@/app/core/navigation/WrappedLink';

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

async function navLinkTreeFromKnowledgeLevelSeries(
  series: KnowledgeLevelSeriesDto,
  seriesIndex: number,
  pathVariables: string[],
  depth: number
): Promise<NavLinkTree> {
  const { knowledgeLevels } = series;
  const baseLinks = ['core', ...pathVariables, String(series.id)];
  const levelLinkTree: NavLinkTree[] = knowledgeLevels.map((level, index) => ({
    displayName: level.name,
    link: [...baseLinks, String(level.levelOrdinal)],
    indexList: [seriesIndex + 1, index + 1],
    children: []
  }));
  return {
    displayName: series.name,
    indexList: [seriesIndex + 1],
    children: levelLinkTree,
    link: baseLinks
  };
}
