import clsx from 'clsx';
import { useLazyDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types';
import { BaseWorkSchemaNode } from '@/components/react-flow/work-schema-node/components/BaseWorkSchemaNode';
import { NodeBase } from '@/components/react-flow/generic/types';
import { NodeProps } from '@/types/xyflow-overrides';
import { WorkSchemaNodeDto } from '@/components/react-flow/generic/utils/adaptors';

import { parseToCssRgba } from '@/components/tables/edit-tables/parseToCssRgba';

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
      style={{
        backgroundColor: entity
          ? parseToCssRgba(entity.workTaskType.knowledgeDomain?.color)
          : undefined
      }}
      {...props}
      className={clsx(
        'relative flex flex-col gap-1 rounded-md border-black bg-white p-2 transition-colors-opacity',
        selected ? 'border-2' : 'border',
        dragging ? 'opacity-50' : ''
      )}
      label={`${entity && entity.name}`}
    ></BaseWorkSchemaNode>
  );
}
