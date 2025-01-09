import { BaseLazyDtoUiProps } from 'dto-stores';
import { WorkTypeDto } from '@/api/generated-types/generated-types_';

export default function WorkTypeSummary({
  entity
}: BaseLazyDtoUiProps<WorkTypeDto>) {
  return (
    <div>
      {entity.knowledgeDomain?.name}:{entity.knowledgeLevel?.name}
    </div>
  );
}
