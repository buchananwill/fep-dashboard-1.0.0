import { Api } from '@/api/clientApi';
import { WpssTransferList } from '@/components/work-project-series-schema/WpssTransferList';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { joinWorkProjectSeriesSchemaIdKey } from '@/functions/workProjectSeriesSchemaIdTransforms';
import { IdWrapper } from '@/api/types';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types_';

export default async function Page() {
  const workProjectSeriesSchemaDtos =
    await Api.WorkProjectSeriesSchema.getAll();

  const tagIdWrapper = workProjectSeriesSchemaDtos.map(
    (wpss) =>
      ({
        id: joinWorkProjectSeriesSchemaIdKey(wpss),
        data: wpss
      }) as IdWrapper<WorkProjectSeriesSchemaDto>
  );

  return (
    <>
      <EditAddDeleteDtoControllerArray
        dtoList={workProjectSeriesSchemaDtos}
        entityClass={EntityClassMap.workProjectSeriesSchema}
      />
      <EditAddDeleteDtoControllerArray
        dtoList={tagIdWrapper}
        entityClass={'IdWrapper'}
      />
    </>
  );
}
