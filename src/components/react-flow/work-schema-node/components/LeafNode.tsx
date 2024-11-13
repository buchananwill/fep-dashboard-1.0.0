import clsx from 'clsx';
import { EntityClassMap } from '@/api/entity-class-map';
import { BaseWorkSchemaNode } from '@/components/react-flow/work-schema-node/components/BaseWorkSchemaNode';
import { NodeBase } from '@/components/react-flow/generic/types';
import { NodeProps } from '@/types/xyflow-overrides';
import { WorkSchemaNodeDto } from '@/components/react-flow/generic/utils/adaptors';

import { parseToCssRgba } from '@/components/tables/edit-tables/parseToCssRgba';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/clientApi';
import { getWorkTaskTypeViewIdString } from '@/components/tables/selectorTables/WorkProjectSeriesSchemaSelectorTable';

export default function LeafNode(
  props: NodeProps<NodeBase<WorkSchemaNodeDto>>
) {
  const { selected, dragging, data } = props;

  const { data: entity, isPending } = useQuery({
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
      style={{
        backgroundColor: entity
          ? parseToCssRgba(entity.workTaskType.knowledgeDomain?.color)
          : undefined
      }}
      {...props}
      className={clsx(
        'transition-colors-opacity relative flex flex-col gap-1 rounded-md border-black bg-white p-2',
        selected ? 'border-2' : 'border',
        dragging ? 'opacity-50' : ''
      )}
      label={`${entity ? getWorkTaskTypeViewIdString(entity.workTaskType) : isPending ? 'loading...' : 'Error!'}`}
    ></BaseWorkSchemaNode>
  );
}
