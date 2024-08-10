'use client';
import IgmTableWrapper, {
  IgmTableWrapperProps
} from '@/components/generic/IgmTableWrapper';
import { KnowledgeDomainDto } from '@/api/zod-schemas/KnowledgeDomainDtoSchema';
import { KnowledgeLevelDto } from '@/api/zod-schemas/KnowledgeLevelDtoSchema';
import { TableProps } from '@nextui-org/react';
import { useCallback, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { initWorkProjectSeriesSchemas } from '@/utils/init-database-functions/operations/initWorkProjectSeriesSchemas';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { IntersectionGeneratorMatrix } from '@/api/types';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types_';

export default function WorkTaskTypeIgmTable({
  submitTo,
  serviceCategoryId,
  columns,
  ...otherProps
}: IgmTableWrapperProps<KnowledgeDomainDto, KnowledgeLevelDto> &
  TableProps & { serviceCategoryId: string }) {
  const appRouterInstance = useRouter();
  const [isPending, startTransition] = useTransition();

  const interceptedSubmitTo = useCallback(
    async (
      matrix: IntersectionGeneratorMatrix<KnowledgeDomainDto, KnowledgeLevelDto>
    ) => {
      startTransition(async () => {
        if (submitTo) {
          const workTaskTypes: WorkTaskTypeDto[] = await submitTo(matrix);
          if (workTaskTypes?.length > 0) {
            await initWorkProjectSeriesSchemas(workTaskTypes); // TODO verify the new schemas have been created?
            const levelOrdinal = columns[0]?.levelOrdinal;
            appRouterInstance.push(
              `/service-categories/${serviceCategoryId}/${levelOrdinal}/work-project-series-schemas`
            );
          }
        }
      });
    },
    [submitTo, serviceCategoryId, columns, appRouterInstance]
  );

  return (
    <div className={'h-fit w-fit'}>
      <PendingOverlay pending={isPending} />
      <IgmTableWrapper
        {...otherProps}
        columns={columns}
        submitTo={interceptedSubmitTo}
      />
    </div>
  );
}
