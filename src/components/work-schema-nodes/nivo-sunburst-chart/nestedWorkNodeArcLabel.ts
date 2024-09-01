import { ComputedDatum } from '@nivo/sunburst';
import { WorkNodeHierarchy } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import {
  getHours,
  getKdStringCode
} from '@/components/work-schema-nodes/nivo-sunburst-chart/WorkNodeResponsiveSunburst';

export function getWorkNodeHierarchyLabel(data: WorkNodeHierarchy) {
  switch (data.type) {
    case 'knowledgeDomainGroup': {
      const kdStringCode =
        data.knowledgeDomains.length > 1
          ? getKdStringCode(data)
          : data.knowledgeDomains[0]?.name ?? 'No KD';
      return `${kdStringCode}`;
    }
    case 'leaf': {
      return `${data.size / 4}hrs`;
    }
    case 'bundle':
      return data.name ?? data.path;
    case 'leafList':
      return '';
    case 'knowledgeLevelGroup':
      return data.knowledgeLevel.name ?? 'no level set';
    default:
      return `${data.type}`;
  }
}

export function nestedWorkNodeArcLabel(
  computedData: ComputedDatum<WorkNodeHierarchy>
) {
  const { data, value, parent } = computedData;
  const hours = getHours(value);
  const nodeHierarchyLabel = getWorkNodeHierarchyLabel(data);
  switch (data.type) {
    case 'bundle':
      return `${nodeHierarchyLabel}: ${hours}`;
    default:
      return nodeHierarchyLabel;
  }
}
