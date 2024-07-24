import { LeafComponentProps } from '@/app/core/navigation/types';
import { getPathVariableSplitComponent } from '@/app/service-categories/[id]/work-schema-nodes/PathVariableSplit';
import ViewFeasibilityReportPage from '@/app/scheduling/feasibility-report/[id]/ViewFeasibilityReportPage';
import { Api } from '@/api/clientApi_';
import { LinkButton } from '@/app/service-categories/LinkButton';
import { Card, CardBody, CardHeader } from '@nextui-org/card';

async function FeasibilityReportLinks({}: LeafComponentProps) {
  const feasibilityReportList = await Api.FeasibilityReport.getAll();
  return (
    <Card>
      <CardHeader>Feasibility Reports</CardHeader>
      <CardBody className={'grid w-fit grid-cols-2'}>
        {feasibilityReportList.map((report) => (
          <LinkButton
            href={`/core/feasibility/view/${report.id}`}
            key={report.id}
          >
            Feasibility Report {report.id}
          </LinkButton>
        ))}
      </CardBody>
    </Card>
  );
}

export const ViewFeasibilityReportHome = getPathVariableSplitComponent(
  FeasibilityReportLinks,
  ViewFeasibilityReportPage
);
