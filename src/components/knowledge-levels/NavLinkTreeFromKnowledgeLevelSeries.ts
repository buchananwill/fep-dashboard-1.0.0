import { KnowledgeLevelSeriesDto } from '@/api/generated-types/generated-types';
import { NavLinkTree } from '@/app/core/navigation/types';

export async function navLinkTreeFromKnowledgeLevelSeries(
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