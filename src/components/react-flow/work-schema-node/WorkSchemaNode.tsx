import { BaseEditableNode } from '@/react-flow/components/nodes/BaseEditableNode';
import { NodeProps } from 'reactflow';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';
import clsx from 'clsx';
import { useLazyDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';

export default function WorkSchemaNode(props: NodeProps<WorkSchemaNodeDto>) {
  const { selected, dragging, data } = props;

  const { entity } = useLazyDtoStore<WorkProjectSeriesSchemaDto>(
    data.workProjectSeriesSchemaId ?? '',
    EntityClassMap.workProjectSeriesSchema
  );

  return (
    <BaseEditableNode
      {...props}
      className={clsx(
        'relative flex flex-col gap-1 rounded-md border-black bg-white p-2 transition-colors-opacity',
        selected ? 'border-2' : 'border',
        dragging ? 'opacity-50' : ''
      )}
    >
      {entity && entity.name.substring(0, entity.name.indexOf(':'))}
    </BaseEditableNode>
  );
}
