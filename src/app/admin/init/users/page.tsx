import { getDtoListByExampleList } from '@/api/generated-actions/KnowledgeLevel';
import { BaseDtoStoreNumberInputProps } from '@/components/generic/DtoStoreNumberInput';
import { DtoUiListAll, EditAddDeleteDtoControllerArray } from 'dto-stores';
import UserNumberInputRow, {
  UserRowState
} from '@/app/admin/init/users/_components/UserNumberInputRow';
import GenerateStudentsButton, {
  UserRowStateClass
} from './_components/GenerateStudentsButton';
import { Api } from '@/api/clientApi_';
import { Card } from '@mantine/core';

export default async function page({
  params: { id }
}: {
  params: { id: string };
}) {
  const serviceCategoryId = parseInt(id);
  const serviceCategory =
    await Api.KnowledgeLevelSeries.getOne(serviceCategoryId);
  const knowledgeLevels = await getDtoListByExampleList([
    { knowledgeLevelSeriesId: serviceCategoryId }
  ]);
  const userRows: UserRowState[] = knowledgeLevels.map((level) => ({
    ...level,
    howMany: 180
  }));

  return (
    <Card>
      <div className={'flex justify-center'}>
        <div className={'rounded-lg bg-sky-800'}>
          <span
            className={
              'inline-block -translate-y-2 translate-x-0.5 select-none rounded-lg bg-gradient-to-br from-sky-50 to-blue-200 p-4'
            }
          >
            Set Students per Year
          </span>
        </div>
      </div>
      <div>
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
      </div>
      <div className={'flex justify-center'}>
        <GenerateStudentsButton />
      </div>
    </Card>
  );
}
