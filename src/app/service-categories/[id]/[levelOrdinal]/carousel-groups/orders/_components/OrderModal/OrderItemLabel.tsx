import { LazyDtoUiWrapper } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkProjectSeriesSchemaCode } from '@/components/feasibility-report/WorkProjectSeriesSchemaLabel';
import { Loading } from '@/components/feasibility-report/AssignmentFeasibilityTreeItem';
import { OrderItemRowProps } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OrderModal/CarouselOrderItem';

export function OrderItemLabel({ orderItem }: OrderItemRowProps) {
  return (
    <LazyDtoUiWrapper
      renderAs={WorkProjectSeriesSchemaCode}
      whileLoading={Loading}
      entityClass={EntityClassMap.workProjectSeriesSchema}
      entityId={orderItem.workProjectSeriesSchemaId}
    />
  );
}
