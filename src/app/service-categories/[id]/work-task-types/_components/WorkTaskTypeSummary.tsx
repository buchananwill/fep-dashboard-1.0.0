import { BaseLazyDtoUiProps } from 'dto-stores';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';

export default function WorkTaskTypeSummary({
  entity
}: BaseLazyDtoUiProps<WorkTaskTypeDto>) {
  return <div>{entity.name}</div>;
}
