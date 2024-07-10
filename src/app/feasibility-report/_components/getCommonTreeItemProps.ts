import { getLabelIcon } from '@/app/feasibility-report/_components/FeasibilityReport';
import { StyledTreeItemProps } from '@/components/CustomTreeItem';

import { FeasibilityReportTreeItemProps } from '@/app/feasibility-report/_components/types';

type CommonTreeItemProps = Pick<
  StyledTreeItemProps,
  'itemId' | 'labelIcon' | 'color' | 'bgColor'
>;

export function getCommonTreeItemProps({
  itemType,
  payload
}: FeasibilityReportTreeItemProps): CommonTreeItemProps {
  const { id } = payload;
  return {
    itemId: `${itemType}:${id}`,
    labelIcon: getLabelIcon(payload),
    color: payload.passes ? '#3c8039' : '#f15865',
    bgColor: '#e6f4ea'
  };
  // switch (itemType) {
  //   case 'assignmentFeasibility':
  //     return {
  //       label: `Node Assignment ${id}`,
  //       ...commonProps
  //     };
  //
  //   case 'cycleFeasibility':
  //     return {
  //       label: `Work Schema Node ${payload.workSchemaNodeId}`,
  //       labelInfo: `${payload.cycleSubspansRequirement}`,
  //       ...commonProps
  //     };
  // }
}
