import EntitySelector, {
  EntitySelectorProps
} from '@/app/service-categories/[id]/work-task-types/_components/EntitySelector';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';

export default function WorkTaskTypeSelector(
  props: Omit<
    EntitySelectorProps<WorkTaskTypeDto, number>,
    'entityClass' | 'labelAccessor'
  >
) {
  return (
    <EntitySelector<WorkTaskTypeDto, number>
      entityClass={EntityClassMap.workTaskType}
      labelAccessor={'name'}
      {...props}
    />
  );
}
