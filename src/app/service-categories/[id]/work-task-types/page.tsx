import { Card } from '@nextui-org/card';
import { initWorkTaskTypesFromMatrix } from '@/utils/init-database-functions/operations/initWorkTaskTypesFromMatrix';
import { getDtoListByExampleList as getKnowledgeLevelsByExample } from '@/api/generated-actions/KnowledgeLevel';
import { getDtoListByExampleList as getKnowledgeDomainsByExample } from '@/api/generated-actions/KnowledgeDomain';
import data from '@/utils/init-json-data/service-categories/workTaskTypesIgm.json';
import { getWorkTaskTypeTableLookUp } from '@/utils/init-json-data/service-categories/getWorkTaskTypeTableLookUp';
import { createRows } from '@/components/generic/createRows';
import columns from '@/utils/init-json-data/service-categories/KnowledgeLevel.json';
import WorkTaskTypeIgmTable from '@/app/service-categories/[id]/work-task-types/_components/WorkTaskTypeIgmTable';

const rowEntityName = 'Lesson Type';
export default async function Page({
  params: { id }
}: {
  params: { id: string };
}) {
  const kLevels = await getKnowledgeLevelsByExample([
    { serviceCategoryId: parseInt(id) }
  ]).then((r) => r.sort((l1, l2) => l1.levelOrdinal - l2.levelOrdinal));

  const kDomains = await getKnowledgeDomainsByExample([
    { serviceCategoryId: parseInt(id) }
  ]);

  const tableRows = createRows(
    kDomains,
    kLevels,
    0,
    getWorkTaskTypeTableLookUp(data)
  );

  const tableColumns = [
    { name: rowEntityName, uid: 'id' },
    ...columns.map((column, index) => ({
      name: column.name,
      uid: `${index}`
    }))
  ];

  return (
    <div className={'h-screen p-8'}>
      <Card fullWidth={false} className={'max-w-3xl'}>
        <WorkTaskTypeIgmTable
          rowEntityClass={rowEntityName}
          serviceCategoryId={id}
          rows={kDomains}
          columns={kLevels}
          tableRows={tableRows}
          tableColumns={tableColumns}
          submitTo={initWorkTaskTypesFromMatrix}
          classNames={{
            base: 'max-h-[640px] overflow-auto',
            table: 'min-h-[420px]',
            thead: 'step_table_header'
          }}
        />
      </Card>
    </div>
  );
}
