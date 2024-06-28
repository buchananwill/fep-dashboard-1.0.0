import { BaseEditableNode } from '@/react-flow/components/nodes/BaseEditableNode';
import { NodeProps } from 'reactflow';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';
import clsx from 'clsx';

export default function WorkSchemaNode(props: NodeProps<WorkSchemaNodeDto>) {
  const { selected, dragging } = props;

  return (
    <BaseEditableNode
      {...props}
      className={clsx(
        'relative flex flex-col gap-1 rounded-md border-black bg-white p-2 transition-colors-opacity',
        selected ? 'border-2' : 'border',
        dragging ? 'opacity-50' : ''
      )}
    />
  );
}
