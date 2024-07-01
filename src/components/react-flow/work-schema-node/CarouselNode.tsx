import { NodeProps } from 'reactflow';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';
import clsx from 'clsx';
import { useLazyDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { BaseWorkSchemaNode } from '@/components/react-flow/work-schema-node/BaseWorkSchemaNode';
import { CarouselDto } from '@/api/dtos/CarouselDtoSchema';

export default function CarouselNode(props: NodeProps<WorkSchemaNodeDto>) {
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
