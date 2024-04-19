import WpssEditTable from '@/app/work-project-series-schemas/components/WpssEditTable';
import data from '@/utils/init-json-data/work-project-series-schema/WorkProjectSeriesSchemaSome.json';
import { DtoControllerArray } from 'dto-stores';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import { DtoListChangesTracker } from '@/components/generic/DtoChangesTracker';

export default function Page() {
  return (
    <>
      <DtoListChangesTracker
        dtoList={data.slice(0, 20)}
        entityName={EntityNamesMap.workProjectSeriesSchema}
      />
      <WpssEditTable
        data={data.slice(0, 20)}
        deliveryAllocationSizes={[1, 2]}
      />
    </>
  );
}
