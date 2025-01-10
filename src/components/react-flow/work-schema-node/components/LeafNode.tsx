import clsx from 'clsx';
import { EntityClassMap } from '@/api/entity-class-map';
import { BaseWorkSchemaNode } from '@/components/react-flow/work-schema-node/components/BaseWorkSchemaNode';
import { NodeBase } from '@/components/react-flow/generic/types';
import { NodeProps } from '@/types/xyflow-overrides';
import { WorkSchemaNodeDto } from '@/components/react-flow/generic/utils/adaptors';

import { parseToCssRgba } from '@/functions/parseToCssRgba';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/clientApi';
import { getWorkTypeViewIdString } from '@/components/tables/selectorTables/WorkSchemaSelectorTable';

export default function LeafNode(
  props: NodeProps<NodeBase<WorkSchemaNodeDto>>
) {
  const { selected, dragging, data } = props;

  const { data: entity, isPending } = useQuery({
    queryKey: [EntityClassMap.workSchema, data.workSchemaId],
    queryFn: () =>
      data.workSchemaId ? Api.WorkSchema.getOne(data.workSchemaId) : undefined
  });

  return (
    <BaseWorkSchemaNode
      style={{
        backgroundColor: entity
          ? parseToCssRgba(entity.workType.knowledgeDomain?.color)
          : undefined
      }}
      {...props}
      className={clsx(
        'transition-colors-opacity relative flex flex-col gap-1 rounded-md border-black bg-white p-2',
        selected ? 'border-2' : 'border',
        dragging ? 'opacity-50' : ''
      )}
      label={`${entity ? getWorkTypeViewIdString(entity.workType) : isPending ? 'loading...' : 'Error!'}`}
    ></BaseWorkSchemaNode>
  );
}
