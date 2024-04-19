import { getOne } from '@/app/api/generated-actions/WorkProjectSeriesSchema';
import { MissingData } from '@/components/generic/MissingData';
import { Card } from '@nextui-org/card';
import { DtoController } from 'dto-stores/dist/controllers/DtoController';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import { DtoListChangesTracker } from '@/components/generic/DtoChangesTracker';

export default async function Page({
  params: { id }
}: {
  params: { id: string };
}) {
  const actionResponse = await getOne(id);

  const data = actionResponse.data;

  if (data === undefined) return <MissingData response={actionResponse} />;

  return (
    <Card>
      <DtoListChangesTracker
        dtoList={[data]}
        entityName={EntityNamesMap.workProjectSeriesSchema}
      />
      <DtoController
        dto={data}
        entityName={EntityNamesMap.workProjectSeriesSchema}
      />
    </Card>
  );
}
