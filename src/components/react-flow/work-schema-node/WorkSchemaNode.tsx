import { BaseEditableNode } from '@/react-flow/components/nodes/BaseEditableNode';
import { NodeProps } from 'reactflow';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';

export default function WorkSchemaNode(props: NodeProps<WorkSchemaNodeDto>) {
  return <BaseEditableNode {...props} />;
}
