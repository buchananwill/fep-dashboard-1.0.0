import EntitySelector, {
  EntitySelectorProps
} from '@/components/generic/EntitySelector';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types_';

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
