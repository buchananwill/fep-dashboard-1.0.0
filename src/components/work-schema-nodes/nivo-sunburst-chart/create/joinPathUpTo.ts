import { joinPath } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/knowledgeLevelGroupFunctions';

export function joinPathUpTo(splittedPath: string[], childDepth: number) {
  return joinPath(...splittedPath.slice(0, childDepth));
}
