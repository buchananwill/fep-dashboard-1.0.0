import React from 'react';

export function AllocationUnit() {
  return (
    <div
      className={
        'w-4 h-4 bg-blue-400 border-blue-600 border-2 rounded-md m-0 p-0'
      }
    ></div>
  );
}

export function AllocationUnitGroup({
  size,
  indexOfGroup
}: {
  size: number;
  indexOfGroup: number;
}) {
  const units: React.JSX.Element[] = [];
  for (let i = 0; i < size; i++) {
    units.push(<AllocationUnit key={`unit-${indexOfGroup}-${i}`} />);
  }
  return <div className={'flex m-0 p-0.5'}>{...units}</div>;
}
