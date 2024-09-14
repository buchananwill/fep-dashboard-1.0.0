import { LeafComponentProps } from '@/app/core/navigation/types';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import ViewFeasibilityReportPage from '@/app/core/feasibility/ViewFeasibilityReportPage';
import { Api } from '@/api/clientApi_';
import { LinkButton } from '@/components/LinkButton';
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
