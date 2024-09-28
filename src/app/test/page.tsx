import { BASE_500 } from '@/components/react-flow/generic/utils/colors';
import { color } from 'd3';
import { isNotUndefined } from '@/api/main';
import { makeTransientId } from '@/functions/makeTransientId';
import data from '@/utils/init-json-data/arts-college/courses.json';
import { colorizeKnowledgeDomainsWithColorDtos } from '@/components/work-schema-nodes/nivo-sunburst-chart/view/colorizeKnowledgeDomains';
import { KnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

export default function page() {
  const colorDtoList = Object.entries(BASE_500)
    .map(([name, colorObject], index) => {
      {
        const colorRgb = color(colorObject.cssHSLA)?.rgb();
        if (colorRgb) {
          const { r, g, b, opacity } = colorRgb;
          return {
            name,
            r: Math.round(r),
            g: Math.round(g),
            b: Math.round(b),
            a: opacity,
            id: makeTransientId(index + 1)
          };
        } else return undefined;
      }
    })
    .filter(isNotUndefined);

  const domainsWithColorDtos = colorizeKnowledgeDomainsWithColorDtos(
    data as unknown as KnowledgeLevelSeriesGroup,
    colorDtoList.slice(5)
  );

  return JSON.stringify(domainsWithColorDtos);
}
