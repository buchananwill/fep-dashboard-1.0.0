import { EntityClassMap } from '@/app/api/entity-class-map';
import { DtoListChangesTracker } from '@/components/generic/DtoChangesTracker';
import WpssEditGridColList from '@/app/work-project-series-schemas/components/WpssEditGridColList';
import { workProjectSeriesSchemaActionSequence } from '@/utils/data-fetching/workProjectSeriesSchemaActionSequence';

const levelOrdinal = 9;

export default async function Page({}: { params: levelOrdinal }) {
  const { workProjectSeriesSchemas: wpssData } =
    await workProjectSeriesSchemaActionSequence({ levelOrdinal });

  return (
    <>
      <DtoListChangesTracker
        dtoList={wpssData}
        entityName={EntityClassMap.workProjectSeriesSchema}
      />
      <WpssEditGridColList />
    </>
  );
}
