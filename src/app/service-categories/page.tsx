import { getPage } from '@/app/api/generated-actions/ServiceCategory';
import { DtoControllerArray } from 'dto-stores';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import { Card, CardBody } from '@nextui-org/card';
import { ClientLinkComponentWrapper } from '@/components/generic/ClientLinkComponentWrapper';
import { MissingData } from '@/components/generic/MissingData';

export default async function Page() {
  const { data } = await getPage({ page: 0, pageSize: 10 });

  if (data === undefined) return <MissingData />;

  return (
    <main className={'p-8'}>
      <DtoControllerArray
        dtoList={data.content}
        entityName={EntityNamesMap.serviceCategory}
      />
      <div className={'p-4'}>
        <Card>
          <CardBody className={'flex flex-col gap-2'}>
            <ClientLinkComponentWrapper
              entityName={EntityNamesMap.serviceCategory}
            />
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
