import { Card, CardBody } from '@nextui-org/card';
import { EntityApiKey } from '@/api/types';
import { Api } from '@/api/clientApi_';
import { LinkButtonThatJoinsList } from '@/app/core/navigation/LinkButtonThatJoinsList';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { startCase } from 'lodash';

export async function LinkListResourcePage({
  entityClass,
  pathVariables
}: {
  entityClass: EntityApiKey;
} & LeafComponentProps) {
  const idList = await Api[entityClass].getIdList();

  return (
    <>
      <div className={'p-4'}>
        <Card>
          <CardBody className={'flex flex-col gap-2'}>
            {idList.map((id) => {
              const linkList = [...pathVariables, String(id)];
              return (
                <LinkButtonThatJoinsList
                  key={id}
                  link={linkList}
                  displayLabel={`${startCase(entityClass)}: ${id}`}
                />
              );
            })}
          </CardBody>
        </Card>
      </div>
    </>
  );
}
