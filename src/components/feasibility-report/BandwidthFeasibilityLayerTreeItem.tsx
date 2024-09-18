import { BaseLazyDtoUiProps, LazyDtoUiWrapper } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { useMemo } from 'react';
import WorkTaskTypeSummary from '@/components/work-task-types/_components/WorkTaskTypeSummary';
import { TaskTypeClassificationDto } from '@/api/zod-schemas/TaskTypeClassificationDtoSchema_';

export function TaskTypeClassificationSummary({
  entity
}: BaseLazyDtoUiProps<TaskTypeClassificationDto>) {
  const children = useMemo(() => {
    switch (entity.classificationType) {
      case 'WORK_TASK_TYPE_TO_PARTY': {
        return entity.taskTypeClassificationItems.map((wttItem) => (
          <LazyDtoUiWrapper
            key={wttItem.id}
            renderAs={WorkTaskTypeSummary}
            entityId={wttItem.workTaskTypeId}
            entityClass={EntityClassMap.workTaskType}
            whileLoading={() => '...loading'}
          />
        ));
      }
      default:
        return [];
    }
  }, [entity]);
  return (
    <div>
      <div className={'rounded-lg border p-2 text-sm'}>
        {entity.classificationType.toLowerCase()}: {entity.name}
      </div>
      {...children}
    </div>
  );
}
