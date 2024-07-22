import { LeafComponentProps } from '@/app/core/navTree';

export default function TestLeaf({ pathVariables, depth }: LeafComponentProps) {
  return <>depth:{pathVariables[depth]}</>;
}
