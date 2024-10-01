import { LinkListResourcePage } from '@/components/generic/LinkListResourcePage';
import { EntityClassMap } from '@/api/entity-class-map';
import { LeafComponentProps } from '@/app/core/navigation/types';

export default function CyclesChooser({
  pathVariables,
  depth
}: LeafComponentProps) {
  return (
    <LinkListResourcePage
      entityClass={EntityClassMap.cycle}
      pathVariables={[...pathVariables]}
      depth={depth}
    />
  );
}
