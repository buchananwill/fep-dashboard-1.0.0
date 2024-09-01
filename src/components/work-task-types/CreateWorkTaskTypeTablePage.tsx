import { Card } from '@nextui-org/card';
import { initWorkTaskTypesFromMatrix } from '@/utils/init-database-functions/operations/initWorkTaskTypesFromMatrix';
import { getDtoListByExampleList as getKnowledgeLevelsByExample } from '@/api/generated-actions/KnowledgeLevel';
import { getDtoListByExampleList as getKnowledgeDomainsByExample } from '@/api/generated-actions/KnowledgeDomain';
import data from '@/utils/init-json-data/service-categories/workTaskTypesIgm.json';
import { getWorkTaskTypeTableLookUp } from '@/utils/init-json-data/service-categories/getWorkTaskTypeTableLookUp';
import { createRows } from '@/components/generic/createRows';
import columns from '@/utils/init-json-data/service-categories/KnowledgeLevel.json';
import WorkTaskTypeIgmTable from '@/components/work-task-types/_components/WorkTaskTypeIgmTable';
import { LeafComponentProps } from '@/app/core/navigation/types';
import PathVariableSplit from '@/components/generic/PathVariableSplit';
import { KnowledgeLevelSeriesLinks } from '@/components/knowledge-domains/KnowledgeLevelSeriesLinks';

const rowEntityName = 'Lesson Type';
async function CreateWorkTaskTypeTablePage({
  pathVariables,
  depth
}: LeafComponentProps) {
  const serviceCategoryId = pathVariables[depth - 1];
  const serviceCategoryIdInt = parseInt(serviceCategoryId);
  const kLevels = await getKnowledgeLevelsByExample([
    { knowledgeLevelSeriesId: serviceCategoryIdInt }
  ]).then((r) => r.sort((l1, l2) => l1.levelOrdinal - l2.levelOrdinal));

  const kDomains = await getKnowledgeDomainsByExample([
    { knowledgeLevelSeriesId: serviceCategoryIdInt }
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
          serviceCategoryId={serviceCategoryId}
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

export default function WorkTaskTypeHome(props: LeafComponentProps) {
  return (
    <PathVariableSplit
      {...props}
      homeComponent={KnowledgeLevelSeriesLinks}
      subRouteComponent={CreateWorkTaskTypeTablePage}
    />
  );
}
