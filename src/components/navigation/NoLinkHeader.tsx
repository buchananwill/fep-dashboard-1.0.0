import { LinkTreeElementProps } from '@/app/core/navigation/links/types';

export function NoLinkHeader({ displayLabel }: LinkTreeElementProps) {
  return (
    <div
      className={
        'm-0.5 h-fit w-fit rounded-xl bg-gray-200 bg-transparent p-0.5 px-2 text-black '
      }
    >
      {displayLabel}
    </div>
  );
}