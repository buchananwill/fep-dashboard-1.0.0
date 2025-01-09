import { LazyDtoUiWrapper } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { EntityWithWorkTypeShortCode } from '@/components/feasibility-report/WorkProjectSeriesSchemaLabel';
import { OrderItemRowProps } from '@/components/carousel-groups/orders/order-modal/CarouselOrderItem';
import { Loading } from '@/components/feasibility-report/Loading';

export function OrderItemLabel({ orderItem }: OrderItemRowProps) {
  return (
    <LazyDtoUiWrapper
      renderAs={EntityWithWorkTypeShortCode}
      whileLoading={Loading}
      entityClass={EntityClassMap.workProjectSeriesSchema}
      entityId={orderItem.workProjectSeriesSchemaId}
    />
  );
}
