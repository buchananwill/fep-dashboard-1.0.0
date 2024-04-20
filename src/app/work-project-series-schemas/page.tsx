import WpssEditTable from '@/app/work-project-series-schemas/components/WpssEditTable';
import data from '@/utils/init-json-data/work-project-series-schema/WorkProjectSeriesSchemaSome.json';
import { DtoControllerArray } from 'dto-stores';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import { DtoListChangesTracker } from '@/components/generic/DtoChangesTracker';
import WpssEditGridColList from '@/app/work-project-series-schemas/components/WpssEditGridColList';

export default function Page() {
  return (
    <>
      <DtoListChangesTracker
        dtoList={data}
        entityName={EntityNamesMap.workProjectSeriesSchema}
      />
      <WpssEditGridColList data={data} deliveryAllocationSizes={[1, 2]} />
    </>
  );
}
