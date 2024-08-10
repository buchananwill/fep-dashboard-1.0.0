import { NodeProps } from '@xyflow/react';
import { WorkSchemaNodeDto } from '@/api/zod-schemas/WorkSchemaNodeDtoSchema_';
import clsx from 'clsx';
import { useLazyDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { BaseWorkSchemaNode } from '@/components/react-flow/work-schema-node/BaseWorkSchemaNode';
import { CarouselGroupDto } from '@/api/zod-schemas/CarouselGroupDtoSchema';
import { NodeBase } from '@/react-flow/types';

export default function CarouselGroupNode(
  props: NodeProps<NodeBase<WorkSchemaNodeDto>>
) {
  const { selected, dragging, data } = props;

  const { entity } = useLazyDtoStore<CarouselGroupDto>(
    data.carouselGroupId ?? NaN,
    EntityClassMap.carouselGroup
  );

  return (
    <BaseWorkSchemaNode
      {...props}
      className={clsx(
        'relative flex flex-col gap-1 rounded-md border-black bg-white p-2 transition-colors-opacity',
        selected ? 'border-2' : 'border',
        dragging ? 'opacity-50' : ''
      )}
      label={`
      Carousel Group ${entity?.name ?? data.name ?? ''}
      `}
    ></BaseWorkSchemaNode>
  );
}
