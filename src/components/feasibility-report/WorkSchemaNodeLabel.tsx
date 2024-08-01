import { BaseLazyDtoUiProps, LazyDtoUiWrapper } from 'dto-stores';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema_';
import { WorkProjectSeriesSchemaLabel } from '@/components/feasibility-report/WorkProjectSeriesSchemaLabel';
import { EntityClassMap } from '@/api/entity-class-map';

export function WorkSchemaNodeLabel({
  entity
}: BaseLazyDtoUiProps<WorkSchemaNodeDto>) {
  if (entity.name) return entity.name;
  else if (entity.workProjectSeriesSchemaId)
    return (
      <LazyDtoUiWrapper
        renderAs={WorkProjectSeriesSchemaLabel}
        entityId={entity.workProjectSeriesSchemaId}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        whileLoading={() => '...loading'}
      />
    );
  else if (entity.carouselId) return 'Carousel';
  else if (entity.carouselGroupId) return 'Carousel Group';
  else return 'Open Node';
}
