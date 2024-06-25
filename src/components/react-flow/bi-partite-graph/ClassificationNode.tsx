import { NodeProps } from 'reactflow';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { BaseReadOnlyNode } from '@/react-flow/components/nodes/BaseReadOnlyNode';
import { HasNumberId } from '@/api/types';
import { ProviderRoleTypeDto } from '@/api/dtos/ProviderRoleTypeDtoSchema';

type BaseClassification<T, U> = HasNumberId & {
  hashcode: number;
  type: string;
  metaType: U;
  members: T[];
  bandwidth: number;
};

type ProviderRoleClassification = {
  type: 'providerRole';
} & BaseClassification<ProviderRoleDto, ProviderRoleTypeDto>;

type WorkTaskTypeClassification = {
  type: 'workTaskType';
} & BaseClassification<WorkTaskTypeDto, ProviderRoleTypeDto>;

export type Classification =
  | ProviderRoleClassification
  | WorkTaskTypeClassification;

function isProviderRoleClassification(
  classification: Classification
): classification is ProviderRoleClassification {
  return classification.type === 'providerRole';
}

function isWorkTaskTypeClassification(
  classification: Classification
): classification is WorkTaskTypeClassification {
  return classification.type === 'workTaskType';
}

export default function ClassificationNode(props: NodeProps<Classification>) {
  const { dragging, data } = props;

  return (
    <BaseReadOnlyNode {...props}>
      {data.type === 'providerRole' && <ProviderRoleList data={data} />}
      {data.type === 'workTaskType' && <WorkTaskTypeList data={data} />}
    </BaseReadOnlyNode>
  );
}

function ProviderRoleList({ data }: { data: ProviderRoleClassification }) {
  return (
    <ul>
      {data.members.map((pRole) => (
        <li key={pRole.id}>{pRole.partyName}</li>
      ))}
    </ul>
  );
}
function WorkTaskTypeList({ data }: { data: WorkTaskTypeClassification }) {
  return (
    <ul>
      {data.members.map((wtt) => (
        <li key={wtt.id}>{wtt.name}</li>
      ))}
    </ul>
  );
}
