import FilteredEntitySelector, {
  EntitySelectorProps
} from '@/components/generic/FilteredEntitySelector';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';

export default function WorkTaskTypeSelector(
  props: Omit<
    EntitySelectorProps<WorkTaskTypeDto, number>,
    'entityClass' | 'labelAccessor'
  >
) {
  return (
    <FilteredEntitySelector<WorkTaskTypeDto, number>
      entityClass={EntityClassMap.workTaskType}
      labelAccessor={'name'}
      {...props}
    />
  );
}
