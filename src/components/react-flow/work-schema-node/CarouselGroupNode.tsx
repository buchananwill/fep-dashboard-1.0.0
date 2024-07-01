import { NodeProps } from 'reactflow';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';
import clsx from 'clsx';
import { useLazyDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { BaseWorkSchemaNode } from '@/components/react-flow/work-schema-node/BaseWorkSchemaNode';
import { CarouselGroupDto } from '@/api/dtos/CarouselGroupDtoSchema';

export default function CarouselGroupNode(props: NodeProps<WorkSchemaNodeDto>) {
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
