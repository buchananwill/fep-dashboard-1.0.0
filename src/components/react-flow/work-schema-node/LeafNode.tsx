import { NodeProps } from '@xyflow/react';
import { WorkSchemaNodeDto } from '@/api/zod-schemas/WorkSchemaNodeDtoSchema_';
import clsx from 'clsx';
import { useLazyDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkProjectSeriesSchemaDto } from '@/api/zod-schemas/WorkProjectSeriesSchemaDtoSchema';
import { BaseWorkSchemaNode } from '@/components/react-flow/work-schema-node/BaseWorkSchemaNode';
import { NodeBase } from '@/react-flow/types';

export default function LeafNode(
  props: NodeProps<NodeBase<WorkSchemaNodeDto>>
) {
  const { selected, dragging, data } = props;

  const { entity } = useLazyDtoStore<WorkProjectSeriesSchemaDto>(
    data.workProjectSeriesSchemaId ?? '',
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
      label={`${entity && entity.shortCode}`}
    ></BaseWorkSchemaNode>
  );
}
