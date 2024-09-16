import { LazyDtoUiWrapper } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { EntityWithWorkTaskTypeShortCode } from '@/components/feasibility-report/WorkProjectSeriesSchemaLabel';
import { Loading } from '@/components/feasibility-report/AssignmentFeasibilityTreeItem';
import { OrderItemRowProps } from '@/components/carousel-groups/orders/order-modal/CarouselOrderItem';

export function OrderItemLabel({ orderItem }: OrderItemRowProps) {
  return (
    <LazyDtoUiWrapper
      renderAs={EntityWithWorkTaskTypeShortCode}
      whileLoading={Loading}
      entityClass={EntityClassMap.workProjectSeriesSchema}
      entityId={orderItem.workProjectSeriesSchemaId}
    />
  );
}
