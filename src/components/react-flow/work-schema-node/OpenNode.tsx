import { NodeProps } from 'reactflow';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema_';
import clsx from 'clsx';
import { BaseWorkSchemaNode } from '@/components/react-flow/work-schema-node/BaseWorkSchemaNode';

export default function OpenNode(props: NodeProps<WorkSchemaNodeDto>) {
  const { selected, dragging, data } = props;

  return (
    <BaseWorkSchemaNode
      {...props}
      className={clsx(
        'relative flex flex-col gap-1 rounded-md border-black bg-white p-2 transition-colors-opacity',
        selected ? 'border-2' : 'border',
        dragging ? 'opacity-50' : ''
      )}
      label={data.name ?? 'Open Node'}
    ></BaseWorkSchemaNode>
  );
}
