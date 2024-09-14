import { EventSourceSimple } from '@/api/custom-types/eventSourceSimple';
import { getColorWithinSpace } from '@/components/work-schema-nodes/nivo-sunburst-chart/view/colorizeKnowledgeDomains';
import { hsl } from 'd3';

export function colorizeEventSources<T>(eventSources: EventSourceSimple<T>[]) {
  let totalSources = eventSources.length;
  eventSources.forEach((source, index) => {
    let colorWithinSpace = getColorWithinSpace(index, totalSources);
    let hslColor = hsl(colorWithinSpace);
    hslColor.l = hslColor.l / 3;
    source.color = colorWithinSpace;
    source.textColor = hslColor.formatRgb();
  });
  return eventSources;
}
