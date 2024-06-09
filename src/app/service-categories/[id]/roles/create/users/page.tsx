import { getOne } from '@/api/generated-actions/ServiceCategory';
import { getDtoListByExampleList } from '@/api/generated-actions/KnowledgeLevel';
import {
  BaseDtoStoreNumberInputProps,
  DtoStoreNumberInput,
  MergedDtoStoreNumberInputProps
} from '@/components/generic/DtoStoreNumberInput';
import { DtoUiListAll, EditAddDeleteDtoControllerArray } from 'dto-stores';
import UserNumberInputRow, {
  UserRowState
} from '@/app/service-categories/[id]/roles/create/users/_components/UserNumberInputRow';
import { BaseDtoStoreStringInputProps } from '@/components/generic/DtoStoreStringInput';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Button } from '@nextui-org/button';

export default async function page({
  params: { id }
}: {
  params: { id: string };
}) {
  const serviceCategoryId = parseInt(id);
  const serviceCategory = await getOne(serviceCategoryId);
  const knowledgeLevels = await getDtoListByExampleList([
    { serviceCategoryId: serviceCategoryId }
  ]);
  const userRows = knowledgeLevels.map((level) => ({
    ...level,
    userCount: 180
  }));

  return (
    <Card classNames={{ base: 'w-fit p-2' }}>
      <CardHeader className={'flex justify-center'}>
        <div className={'rounded-lg bg-sky-800'}>
          <span
            className={
              'inline-block -translate-y-2 translate-x-0.5 select-none rounded-lg bg-gradient-to-br from-sky-50 to-blue-200 p-4'
            }
          >
            Set Students per Year
          </span>
        </div>
      </CardHeader>
      <CardBody>
        <div className={'grid grid-cols-2 gap-2'}>
          <EditAddDeleteDtoControllerArray
            entityClass={'UserRowState'}
            dtoList={userRows}
          />
          <DtoUiListAll<
            UserRowState,
            BaseDtoStoreNumberInputProps<UserRowState>
          >
            entityClass={'UserRowState'}
            renderAs={UserNumberInputRow}
            numberKey={'userCount'}
          />
        </div>
      </CardBody>
      <CardFooter className={'flex justify-center'}>
        <Button
          className={
            'group m-2 h-fit w-fit min-w-fit overflow-visible rounded-lg bg-sky-800 p-0'
          }
          disableRipple={true}
          disableAnimation={true}
        >
          <span
            className={
              'inline-block -translate-y-1 select-none rounded-lg bg-gradient-to-br from-sky-50 to-blue-200 p-4 transition-transform duration-250 ease-out hover:-translate-y-2 active:-translate-y-0.5'
            }
          >
            Generate
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}
