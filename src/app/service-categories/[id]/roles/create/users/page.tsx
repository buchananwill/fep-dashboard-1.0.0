import { getDtoListByExampleList } from '@/api/generated-actions/KnowledgeLevel';
import { BaseDtoStoreNumberInputProps } from '@/components/generic/DtoStoreNumberInput';
import { DtoUiListAll, EditAddDeleteDtoControllerArray } from 'dto-stores';
import UserNumberInputRow, {
  UserRowState
} from '@/app/service-categories/[id]/roles/create/users/_components/UserNumberInputRow';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import GenerateStudentsButton, {
  UserRowStateClass
} from './_components/GenerateStudentsButton';
import { Api } from '@/api/clientApi_';

export default async function page({
  params: { id }
}: {
  params: { id: string };
}) {
  const serviceCategoryId = parseInt(id);
  const serviceCategory =
    await Api.KnowledgeLevelSeries.getOne(serviceCategoryId);
  const knowledgeLevels = await getDtoListByExampleList([
    { serviceCategoryId: serviceCategoryId }
  ]);
  const userRows: UserRowState[] = knowledgeLevels.map((level) => ({
    ...level,
    howMany: 180
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
            entityClass={UserRowStateClass}
            dtoList={userRows}
          />
          <DtoUiListAll<
            UserRowState,
            BaseDtoStoreNumberInputProps<UserRowState>
          >
            entityClass={UserRowStateClass}
            renderAs={UserNumberInputRow}
            numberKey={'howMany'}
          />
        </div>
      </CardBody>
      <CardFooter className={'flex justify-center'}>
        <GenerateStudentsButton />
      </CardFooter>
    </Card>
  );
}
