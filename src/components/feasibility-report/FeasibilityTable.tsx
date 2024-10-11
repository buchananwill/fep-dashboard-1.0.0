import { ReactElement, ReactNode } from 'react';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';
import { ScrollShadow } from '@nextui-org/scroll-shadow';

export function FeasibilityTable({
  headerCellContent,
  bodyContent,
  pathVariables
}: {
  headerCellContent: (string | ReactElement)[];
  bodyContent: ReactNode;
} & LeafComponentProps) {
  return (
    <div className={'h-[100vh] w-fit p-4'}>
      <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
        <div className={'h-fit w-fit overflow-hidden rounded-lg '}>
          <ScrollShadow
            className={
              'center-all-margin max-h-[90vh] w-fit overflow-auto p-2 pt-6'
            }
          >
            <table className={'table-fixed border-collapse'}>
              <thead
                className={
                  'sticky top-0 z-50 overflow-hidden rounded-lg bg-white '
                }
              >
                <tr
                  className={
                    'z-50 overflow-hidden rounded-lg px-4 shadow-small'
                  }
                >
                  {headerCellContent.map((item, index) => (
                    <th
                      className={
                        'px-2 py-2 first:rounded-l-lg first:pl-4 last:rounded-r-lg last:pr-4'
                      }
                      key={index}
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              {bodyContent}
            </table>
          </ScrollShadow>
        </div>
      </RootCard>
    </div>
  );
}
