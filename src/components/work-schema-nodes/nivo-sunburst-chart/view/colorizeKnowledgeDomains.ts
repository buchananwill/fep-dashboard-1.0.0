import {
  KnowledgeDomainGroup,
  KnowledgeLevelSeriesGroup,
  WorkNodeHierarchy
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { hsl, interpolateRainbow } from 'd3';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types_';

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

function flatMapOfKnowledgeDomainGroups(
  node: WorkNodeHierarchy
): KnowledgeDomainGroup[] {
  switch (node.type) {
    case 'bundle':
      return node.children;
    case 'knowledgeDomainGroup':
      return [node];
    case 'leafList':
    case 'leaf':
      return [];
    case 'knowledgeLevelGroup':
    case 'knowledgeLevelSeriesGroup':
      return node.children.flatMap((child) =>
        flatMapOfKnowledgeDomainGroups(child)
      );
  }
}

function createKDGmap(node: WorkNodeHierarchy) {
  const knowledgeDomainGroups = flatMapOfKnowledgeDomainGroups(node);
  const kdgMap = new Map<string, KnowledgeDomainGroup[]>();
  for (let knowledgeDomainGroup of knowledgeDomainGroups) {
    const kdStringCode = knowledgeDomainGroup.knowledgeDomains
      .map((kd) => kd.name)
      .toSorted((a, b) => a.localeCompare(b))
      .join(',');
    let list = kdgMap.get(kdStringCode);
    if (list === undefined) {
      list = [] as KnowledgeDomainGroup[];
      kdgMap.set(kdStringCode, list);
    }
    list.push(knowledgeDomainGroup);
  }
  return kdgMap;
}

export function colorizeKnowledgeDomainGroups<T extends WorkNodeHierarchy>(
  node: T
) {
  const kdgMap = createKDGmap(node);
  const differentKCount = kdgMap.size;
  let colorScale = 0;
  for (let kdgList of kdgMap.values()) {
    const finalColor = getColorWithinSpace(colorScale, differentKCount);
    for (let kdgListElement of kdgList) {
      kdgListElement.color = finalColor;
    }
    colorScale++;
  }
  return node as T;
}
export function colorizeKnowledgeDomainsWithColorDtos<
  T extends WorkNodeHierarchy
>(node: T, colors: any[]) {
  const kdNameListMap = new Map<string, KnowledgeDomainDto[]>();
  flatMapOfKnowledgeDomainGroups(node)
    .flatMap((kdg) => kdg.knowledgeDomains)
    .forEach((kd) => {
      let list = kdNameListMap.get(kd.name);
      if (!list) {
        list = [];
        kdNameListMap.set(kd.name, list);
      }
      list.push(kd);
    });

  const listOfLists = [...kdNameListMap.values()];
  for (let i = 0; i < listOfLists.length; i++) {
    const kdList = listOfLists[i];
    const colorIndex = i % colors.length;
    const color = colors[colorIndex];
    for (let kdListElement of kdList) {
      kdListElement.color = color;
    }
  }

  return node as T;
}
