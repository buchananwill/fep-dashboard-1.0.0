import { NodeProps } from 'reactflow';

import React from 'react';
import clsx from 'clsx';
import { BaseNodeMemo } from '@/react-flow/components/nodes/BaseNode';
import { OrganizationDto } from '@/api/dtos/OrganizationDtoSchema';

function OrganizationNode(nodeProps: NodeProps<OrganizationDto>) {
  const { selected, dragging, data } = nodeProps;

  return (
    <BaseNodeMemo
      {...nodeProps}
      className={clsx(
        'relative flex flex-col gap-1 rounded-md border-black p-2 transition-colors-opacity bg-white',
        selected ? 'border-2' : 'border',
        dragging ? 'opacity-50' : ''
      )}
    ></BaseNodeMemo>
  );
}

export default React.memo(OrganizationNode);

// eslint-disable-next-line no-unused-vars
const orgTypeBgColors: { [key in OrgType]: string } = {
  'Year Group': 'bg-white',
  Maths: 'bg-sky-100',
  DT: 'bg-teal-100',
  Other: 'bg-amber-100',
  'Student Group': 'bg-gray-100'
};

export const OrgTypes = [
  'Year Group',
  'Maths',
  'DT',
  'Other',
  'Student Group'
] as const;

type OrgType = (typeof OrgTypes)[number];
