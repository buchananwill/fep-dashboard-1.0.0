import { useDtoStore } from 'dto-stores';
import { IdWrapper } from '@/api/types';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types_';
import { Pill } from '@mantine/core';
import {
  getAutoContrastFromCielab,
  parseToHsl
} from '@/functions/parseToCssRgba';
import { lab } from 'd3';
import { TransferItemLabelProps } from '@/components/generic/combo-boxes/TransferList';
import { Reorder } from 'framer-motion';

export function WorkProjectSeriesSchemaPill({
  item,
  type
}: TransferItemLabelProps) {
  const { entity } = useDtoStore<IdWrapper<WorkProjectSeriesSchemaDto>>({
    entityId: item,
    entityClass: 'IdWrapper'
  });

  let color = parseToHsl(entity?.data?.workType?.knowledgeDomain?.color);
  let contrastWhiteBlack = undefined;
  if (color) {
    color.l *= 1.3;
    color.s *= 0.95;
    const labColor = lab(color);
    contrastWhiteBlack = getAutoContrastFromCielab(labColor);
  }

  return (
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
  );
}
