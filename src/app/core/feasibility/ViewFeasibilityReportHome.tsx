import { LeafComponentProps } from '@/app/core/navigation/types';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import ViewFeasibilityReportPage from '@/app/core/feasibility/ViewFeasibilityReportPage';
import { Api } from '@/api/clientApi_';
import { LinkButton } from '@/components/navigation/LinkButton';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import RootCard from '@/app/core/navigation/RootCard';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';

async function FeasibilityReportLinks({ pathVariables }: LeafComponentProps) {
  const feasibilityReportList = await Api.FeasibilityReport.getAll();
  return (
    <div className={'p-4'}>
      <RootCard
        layoutId={getRootCardLayoutId(pathVariables)}
        displayHeader={'Feasibility Reports'}
      >
        <div className={'grid w-fit grid-cols-2'}>
          {feasibilityReportList.map((report) => (
            <LinkButton
              href={`/core/feasibility/view/${report.id}`}
              key={report.id}
            >
              Feasibility Report {report.id}
            </LinkButton>
          ))}
        </div>
      </RootCard>
    </div>
  );
}

export const ViewFeasibilityReportHome = getPathVariableSplitComponent(
  FeasibilityReportLinks,
  ViewFeasibilityReportPage
);
