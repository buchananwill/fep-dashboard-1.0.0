import { LeafComponentProps } from '@/app/core/navigation/types';
import { getPathVariableSplitComponent } from '@/app/service-categories/[id]/work-schema-nodes/PathVariableSplit';
import ViewFeasibilityReportPage from '@/app/scheduling/feasibility-report/[id]/ViewFeasibilityReportPage';

async function FeasibilityReportLinks({}: LeafComponentProps) {
  return 'Links';
}

export const ViewFeasibilityReportHome = getPathVariableSplitComponent(
  FeasibilityReportLinks,
  ViewFeasibilityReportPage
);
