import clsx from 'clsx';
import { useLazyDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types';
import { BaseWorkSchemaNode } from '@/components/react-flow/work-schema-node/BaseWorkSchemaNode';
import { CarouselOptionDto } from '@/api/generated-types/generated-types';
import { NodeBase } from '@/components/react-flow/generic/types';
import { NodeProps } from '@/types/xyflow-overrides';
import { WorkSchemaNodeDto } from '@/api/generated-types/generated-types';

export default function CarouselOptionNode(
  props: NodeProps<NodeBase<WorkSchemaNodeDto>>
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
      label={`Option: ${workProjectSeriesSchema && workProjectSeriesSchema.name}`}
    ></BaseWorkSchemaNode>
  );
}
