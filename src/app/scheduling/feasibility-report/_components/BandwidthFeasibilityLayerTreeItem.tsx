import { BandwidthFeasibilityLayer } from '@/app/scheduling/feasibility-report/_components/types';
import {
  CustomTreeItem,
  StyledTreeItemProps
} from '@/components/CustomTreeItem';
import { BaseLazyDtoUiProps, LazyDtoUiWrapper } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { useMemo } from 'react';
import { TaskTypeClassificationDto } from '@/api/dtos/TaskTypeClassificationDtoSchema_';
import { NamedEntityLabel } from '@/app/scheduling/feasibility-report/_components/WorkProjectSeriesSchemaLabel';

function TaskTypeClassificationSummary({
  entity
}: BaseLazyDtoUiProps<TaskTypeClassificationDto>) {
  const children = useMemo(() => {
    switch (entity.classificationType) {
      case 'WORK_TASK_TYPE_TO_PARTY': {
        return entity.taskTypeClassificationItems.map((wttItem) => (
          <LazyDtoUiWrapper
            key={wttItem.id}
            renderAs={NamedEntityLabel}
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