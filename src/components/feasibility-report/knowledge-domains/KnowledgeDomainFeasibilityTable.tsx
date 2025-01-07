import { LeafComponentProps } from '@/app/core/navigation/data/types';
import { getKnowledgeDomainTaskAreas } from '@/api/actions-custom/feasibilities';
import { FeasibilityTable } from '@/components/feasibility-report/FeasibilityTable';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';
import KnowledgeDomainTaskArea from '@/components/feasibility-report/knowledge-domains/KnowledgeDomainTaskArea';

export default async function KnowledgeDomainFeasibilityTable({
  pathVariables,
  depth
}: LeafComponentProps) {
  const knowledgeDomainTaskAreas = await getKnowledgeDomainTaskAreas();

  console.log(knowledgeDomainTaskAreas);

  return (
    <FeasibilityTable
      pathVariables={pathVariables}
      depth={depth}
      headerCellContent={[
        'Short Code',
        getStartCaseDomainAlias('knowledgeDomain'),
        'Task Total',
        'Achieved',
        'Outcome'
      ]}
      bodyContent={
        <tbody>
          {knowledgeDomainTaskAreas.map((feasibility) => (
            <KnowledgeDomainTaskArea
              taskAreaPerKnowledgeDomainDto={feasibility}
              key={feasibility.id}
            />
          ))}
        </tbody>
      }
    />
  );
}
