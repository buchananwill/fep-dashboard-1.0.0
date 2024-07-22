import React, { memo } from 'react';

export const TooltipMemo = memo(SimpleTooltip);

function SimpleTooltip({ text }: { text: string }) {
  return (
    <div
      className={
        'pointer-events-none rounded-md border border-gray-400 bg-gray-100 p-2 text-black'
      }
    >
      {text}
    </div>
  );
}
