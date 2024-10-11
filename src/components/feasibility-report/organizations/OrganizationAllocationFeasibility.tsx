import clsx from 'clsx';
import React from 'react';

export default function OrganizationAllocationFeasibility({
  residual,
  size,
  sum
}: {
  residual: number;
  size: string;
  sum: number;
}) {
  return (
    <tr
      className={clsx(residual >= 0 ? 'bg-emerald-100' : 'bg-red-100', 'px-1')}
    >
      <th className={'px-1'}>{size}</th>
      <TableCell className={'text-right'}>{sum}</TableCell>
      <TableCell className={'text-right'}>{residual}</TableCell>
    </tr>
  );
}

export type GenericTableCellProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

function TableCell({
  className,
  children,
  ...otherProps
}: GenericTableCellProps) {
  return (
    <td className={clsx(className, 'px-1')} {...otherProps}>
      {children}
    </td>
  );
}
