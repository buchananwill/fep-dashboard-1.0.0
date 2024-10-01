import { KnowledgeLevelSeriesDto } from '@/api/generated-types/generated-types';
import { NavLinkTree } from '@/app/core/navigation/types';
import { navKeyList } from '@/components/navigation/navLinkIcons';

export async function navLinkTreeFromKnowledgeLevelSeries(
  series: KnowledgeLevelSeriesDto,
  seriesIndex: number,
  pathVariables: string[],
  depth: number
): Promise<NavLinkTree> {
  const navIndex = navKeyList.indexOf('knowledgeLevelSeries');
  const { knowledgeLevels } = series;
  const baseLinks = ['core', ...pathVariables, String(series.id)];
  const levelLinkTree: NavLinkTree[] = knowledgeLevels.map((level, index) => ({
    displayName: level.name,
    link: [...baseLinks, String(level.levelOrdinal)],
    indexList: [navIndex, seriesIndex + 1, index + 1],
    children: []
  }));
  return {
    displayName: series.name,
    indexList: [navIndex, seriesIndex + 1],
    children: levelLinkTree,
    link: baseLinks
  };
}
