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

  const { data: workSchema, isPending } = useQuery({
    queryKey: [EntityClassMap.workSchema, data.workSchemaId],
    queryFn: () =>
      data.workSchemaId ? Api.WorkSchema.getOne(data.workSchemaId) : undefined
  });

  return (
    <BaseWorkSchemaNode
      {...props}
      className={clsx(
        'transition-colors-opacity relative flex flex-col gap-1 rounded-md border-black bg-white p-2',
        selected ? 'border-2' : 'border',
        dragging ? 'opacity-50' : ''
      )}
      label={`Option: ${workSchema && workSchema.name}`}
    ></BaseWorkSchemaNode>
  );
}
