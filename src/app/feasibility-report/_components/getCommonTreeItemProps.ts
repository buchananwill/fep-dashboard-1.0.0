import { getLabelIcon } from '@/app/feasibility-report/_components/FeasibilityReport';
import { StyledTreeItemProps } from '@/components/CustomTreeItem';

import { FeasibilityReportTreeItemPayload } from '@/app/feasibility-report/_components/types';

type CommonTreeItemProps = Pick<
  StyledTreeItemProps,
  'itemId' | 'labelIcon' | 'color' | 'bgColor' | 'forceIconColor'
>;

interface BaseReportItem {
  passes: boolean;
}

export function getColor(payload: BaseReportItem) {
  return { color: payload.passes ? '#3c8039' : '#f15865' };
}

export function getBgColor(payload: BaseReportItem) {
  return { bgColor: payload.passes ? '#e6f4ea' : '#f4e6e6' };
}

export function getCommonTreeItemProps(
  payload: FeasibilityReportTreeItemPayload
): CommonTreeItemProps {
  const { id, itemType } = payload;
  return {
    itemId: `${itemType}:${id}`,
    forceIconColor: true,
    ...getLabelIcon(payload),
    ...getColor(payload),
    ...getBgColor(payload)
  };
}
