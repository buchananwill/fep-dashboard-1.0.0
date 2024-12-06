import clsx from 'clsx';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkSchemaNodeDto } from '@/api/generated-types/generated-types_';
import { BaseWorkSchemaNode } from '@/components/react-flow/work-schema-node/components/BaseWorkSchemaNode';
import { NodeBase } from '@/components/react-flow/generic/types';
import { NodeProps } from '@/types/xyflow-overrides';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/clientApi';

export default function CarouselOptionNode(
  props: NodeProps<NodeBase<WorkSchemaNodeDto>>
) {
  const { selected, dragging, data } = props;

  const { data: workProjectSeriesSchema, isPending } = useQuery({
    queryKey: [
      EntityClassMap.workProjectSeriesSchema,
      data.workProjectSeriesSchemaId
    ],
    queryFn: () =>
      data.workProjectSeriesSchemaId
        ? Api.WorkProjectSeriesSchema.getOne(data.workProjectSeriesSchemaId)
        : undefined
  });

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
