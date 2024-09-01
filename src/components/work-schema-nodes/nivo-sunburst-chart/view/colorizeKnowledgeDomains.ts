import {
  KnowledgeDomainGroup,
  KnowledgeLevelSeriesGroup
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { hsl, interpolateRainbow } from 'd3';

export function getColorWithinSpace(
  scalePosition: number,
  totalColors: number
) {
  const interpolatedColor = hsl(
    interpolateRainbow(scalePosition / totalColors)
  );
  interpolatedColor.s *= 0.7;
  interpolatedColor.l = 1 - interpolatedColor.l / 3;
  return interpolatedColor.formatRgb();
}

export const colorizeKnowledgeDomains = (node: KnowledgeLevelSeriesGroup) => {
  const kdgMap = new Map<string, KnowledgeDomainGroup[]>();
  for (let child of node.children) {
    for (let bundleChild of child.children) {
      for (let kdgChild of bundleChild.children) {
        const kdStringCode = kdgChild.knowledgeDomains
          .map((kd) => kd.shortCode)
          .toSorted((a, b) => a.localeCompare(b))
          .join(',');
        let list = kdgMap.get(kdStringCode);
        if (list === undefined) {
          list = [] as KnowledgeDomainGroup[];
          kdgMap.set(kdStringCode, list);
        }
        list.push(kdgChild);
      }
    }
  }
  const differentKCount = kdgMap.size;
  let colorScale = 0;
  for (let kdgList of kdgMap.values()) {
    const finalColor = getColorWithinSpace(colorScale, differentKCount);
    for (let kdgListElement of kdgList) {
      kdgListElement.color = finalColor;
    }
    colorScale++;
  }
  return node;
};
