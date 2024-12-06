import clsx from 'clsx';
import { useLazyDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { BaseWorkSchemaNode } from '@/components/react-flow/work-schema-node/components/BaseWorkSchemaNode';
import { CarouselDto } from '@/api/generated-types/generated-types_';
import { NodeBase } from '@/components/react-flow/generic/types';
import { NodeProps } from '@/types/xyflow-overrides';
import { WorkSchemaNodeDto } from '@/api/generated-types/generated-types_';

export default function CarouselNode(
  props: NodeProps<NodeBase<WorkSchemaNodeDto>>
) {
  const { selected, dragging, data } = props;

  const { entity } = useLazyDtoStore<CarouselDto>(
    data.carouselId ?? NaN,
    EntityClassMap.carousel
  );

  return (
    <BaseWorkSchemaNode
      {...props}
      className={clsx(
        'relative flex flex-col gap-1 rounded-md border-black bg-white p-2 transition-colors-opacity',
        selected ? 'border-2' : 'border',
        dragging ? 'opacity-50' : ''
      )}
      label={`Carousel ${entity?.name ?? data.name ?? ''}`}
    ></BaseWorkSchemaNode>
  );
}
