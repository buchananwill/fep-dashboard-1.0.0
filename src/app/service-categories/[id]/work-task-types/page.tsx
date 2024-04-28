import IgmTableWrapper from '@/app/service-categories/[id]/work-task-types/IgmTableWrapper';
import { Card } from '@nextui-org/card';
import { submitLessonTypeMatrix } from '@/app/service-categories/[id]/work-task-types/submit-lesson-type-matrix';
import { getDtoListByExampleList as getKnowledgeLevelsByExample } from '@/app/api/generated-actions/KnowledgeLevel';
import { getDtoListByExampleList as getKnowledgeDomainsByExample } from '@/app/api/generated-actions/KnowledgeDomain';
import { MissingData } from '@/components/generic/MissingData';

const rowEntityName = 'Lesson Type';
export default async function Page({
  params: { id }
}: {
  params: { id: string };
}) {
  const kLevels = await getKnowledgeLevelsByExample([
    { serviceCategoryId: parseInt(id) }
  ]);

  const kDomains = await getKnowledgeDomainsByExample([
    { serviceCategoryId: parseInt(id) }
  ]);

  return (
    <Card fullWidth={false} className={'max-w-3xl'}>
      <IgmTableWrapper
        rowEntityName={rowEntityName}
        rows={kDomains}
        columns={kLevels}
        submitTo={submitLessonTypeMatrix}
      />
    </Card>
  );
}
