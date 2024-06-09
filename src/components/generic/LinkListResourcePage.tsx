import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { Card, CardBody } from '@nextui-org/card';
import { ClientLinkComponentWrapper } from '@/components/generic/ClientLinkComponentWrapper';
import { HasId } from '@/api/types';

export function LinkListResourcePage<T extends HasId>({
  entityClass,
  dtoList
}: {
  entityClass: string;
  dtoList: T[];
}) {
  return (
    <>
      <EditAddDeleteDtoControllerArray
        dtoList={dtoList}
        entityClass={entityClass}
      />
      <div className={'p-4'}>
        <Card>
          <CardBody className={'flex flex-col gap-2'}>
            <ClientLinkComponentWrapper entityClass={entityClass} />
          </CardBody>
        </Card>
      </div>
    </>
  );
}
