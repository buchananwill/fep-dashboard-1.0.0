import { BaseEditableNode } from '@/react-flow/components/nodes/BaseEditableNode';
import { NodeProps } from 'reactflow';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';
import clsx from 'clsx';
import { useLazyDtoStore, useReadAnyDto } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { BaseWorkSchemaNode } from '@/components/react-flow/work-schema-node/BaseWorkSchemaNode';
import { workProjectSeriesSchemaActionSequence } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/_functions/workProjectSeriesSchemaActionSequence';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { useMemo } from 'react';
import { sumDeliveryAllocations } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/_functions/sumDeliveryAllocations';

export default function CarouselOptionNode(
  props: NodeProps<WorkSchemaNodeDto>
) {
  const { selected, dragging, data } = props;

  const { entity } = useLazyDtoStore<CarouselOptionDto>(
    data.carouselOptionId ?? NaN,
    EntityClassMap.carouselOption
  );

  const { entity: workProjectSeriesSchema } =
    useLazyDtoStore<WorkProjectSeriesSchemaDto>(
      entity?.workProjectSeriesSchemaId ?? '',
      EntityClassMap.workProjectSeriesSchema
    );

  return (
    <BaseWorkSchemaNode
      {...props}
      className={clsx(
        'relative flex flex-col gap-1 rounded-md border-black bg-white p-2 transition-colors-opacity',
        selected ? 'border-2' : 'border',
        dragging ? 'opacity-50' : ''
      )}
      label={`Option:
      ${
        workProjectSeriesSchema &&
        workProjectSeriesSchema.name.substring(
          0,
          workProjectSeriesSchema.name.indexOf(':')
        )
      }`}
    ></BaseWorkSchemaNode>
  );
}
