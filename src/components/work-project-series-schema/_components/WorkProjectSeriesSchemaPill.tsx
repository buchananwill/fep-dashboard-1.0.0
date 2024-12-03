import { useDtoStore } from 'dto-stores';
import { IdWrapper } from '@/api/types';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types';
import { Pill } from '@mantine/core';
import {
  getAutoContrastFromCielab,
  parseToHsl
} from '@/components/tables/edit-tables/parseToCssRgba';
import { lab } from 'd3';

export function WorkProjectSeriesSchemaPill({ item }: { item: string }) {
  const { entity } = useDtoStore<IdWrapper<WorkProjectSeriesSchemaDto>>({
    entityId: item,
    entityClass: 'IdWrapper'
  });

  let color = parseToHsl(entity?.data?.workTaskType?.knowledgeDomain?.color);
  let contrastWhiteBlack = undefined;
  if (color) {
    color.l *= 1.3;
    color.s *= 0.95;
    const labColor = lab(color);
    contrastWhiteBlack = getAutoContrastFromCielab(labColor);
  }

  return (
    <>
      <Pill
        styles={{
          root: {
            backgroundColor: contrastWhiteBlack?.main
          },
          label: {
            color: contrastWhiteBlack?.contrast
          }
        }}
      >
        {item}
      </Pill>
    </>
  );
}
