import { NodeProps } from '@/types/xyflow-overrides';
import { NodeBase } from '@/components/react-flow/generic/types';
import { InitJsonTemplateNodeData } from '@/components/react-flow/init-json-template/types';
import { BaseEditableNode } from '@/components/react-flow/generic/components/nodes/BaseEditableNode';

export function InitJsonTemplateNode(
  props: NodeProps<NodeBase<InitJsonTemplateNodeData>>
) {
  return <BaseEditableNode {...props}>{props.data.id}</BaseEditableNode>;
}
