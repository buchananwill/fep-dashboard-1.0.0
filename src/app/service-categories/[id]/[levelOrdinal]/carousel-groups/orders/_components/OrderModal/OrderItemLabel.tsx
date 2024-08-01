import { LazyDtoUiWrapper } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkProjectSeriesSchemaCode } from '@/app/scheduling/feasibility-report/_components/WorkProjectSeriesSchemaLabel';
import { Loading } from '@/app/scheduling/feasibility-report/_components/AssignmentFeasibilityTreeItem';
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
