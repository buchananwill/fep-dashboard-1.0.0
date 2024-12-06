import { BaseLazyDtoUiProps } from 'dto-stores';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types_';

export default function WorkTaskTypeSummary({
  entity
}: BaseLazyDtoUiProps<WorkTaskTypeDto>) {
  return (
    <div>
      {entity.knowledgeDomain?.name}:{entity.knowledgeLevel?.name}
    </div>
  );
}
