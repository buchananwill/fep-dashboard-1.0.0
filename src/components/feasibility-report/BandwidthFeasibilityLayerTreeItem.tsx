import { BandwidthFeasibilityLayer } from '@/components/feasibility-report/types';
import {
  CustomTreeItem,
  StyledTreeItemProps
} from '@/components/mui/CustomTreeItem';
import { BaseLazyDtoUiProps, LazyDtoUiWrapper } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { useMemo } from 'react';
import WorkTaskTypeSummary from '@/components/work-task-types/_components/WorkTaskTypeSummary';
import { TaskTypeClassificationDto } from '@/api/zod-schemas/TaskTypeClassificationDtoSchema_';

function TaskTypeClassificationSummary({
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

export default function BandwidthFeasibilityLayerTreeItem({
  payload,
  children,
  itemType,
  ...props
}: { payload: BandwidthFeasibilityLayer } & StyledTreeItemProps) {
  const layerItems = useMemo(() => {
    return payload.bandwidthFeasibilityLayerItems.map((item) => (
      <LazyDtoUiWrapper
        key={`layerItem:${item.bandwidthFeasibilityLayerId}`}
        renderAs={TaskTypeClassificationSummary}
        entityId={item.taskTypeClassificationId}
        entityClass={'TaskTypeClassification'}
        whileLoading={() => '...loading'}
      />
    ));
  }, [payload.bandwidthFeasibilityLayerItems]);

  return (
    <CustomTreeItem
      {...props}
      forceIconColor={true}
      label={'Bandwidth feasibility layer'}
      labelInfo={`Residual: ${payload.residual}`}
    >
      {...layerItems}
      {children}
    </CustomTreeItem>
  );
}
