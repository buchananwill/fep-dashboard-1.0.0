import { HasId } from '@/app/api/main';
import { DtoControllerArray } from 'dto-stores';
import { Card, CardBody } from '@nextui-org/card';
import { ClientLinkComponentWrapper } from '@/components/generic/ClientLinkComponentWrapper';

export function LinkListResourcePage<T extends HasId>({
  entityName,
  dtoList
}: {
  entityName: string;
  dtoList: T[];
}) {
  return (
    <>
      <DtoControllerArray dtoList={dtoList} entityName={entityName} />
      <div className={'p-4'}>
        <Card>
          <CardBody className={'flex flex-col gap-2'}>
            <ClientLinkComponentWrapper entityName={entityName} />
          </CardBody>
        </Card>
      </div>
    </>
  );
}
