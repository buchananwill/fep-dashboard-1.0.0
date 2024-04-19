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
  const knowledgeLevelResp = await getKnowledgeLevelsByExample([
    { serviceCategoryId: parseInt(id) }
  ]);
  const kLevels = knowledgeLevelResp.data;
  if (kLevels === undefined)
    return <MissingData response={knowledgeLevelResp} />;

  const knowledgeDomResponse = await getKnowledgeDomainsByExample([
    { serviceCategoryId: parseInt(id) }
  ]);
  const kDomains = knowledgeDomResponse.data;
  if (kDomains === undefined)
    return <MissingData response={knowledgeDomResponse} />;

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
