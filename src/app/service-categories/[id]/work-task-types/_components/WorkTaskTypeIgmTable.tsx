'use client';
import IgmTableWrapper, {
  IgmTableWrapperProps
} from '@/components/generic/IgmTableWrapper';
import { KnowledgeDomainDto } from '@/api/dtos/KnowledgeDomainDtoSchema';
import { KnowledgeLevelDto } from '@/api/dtos/KnowledgeLevelDtoSchema';
import { TableProps } from '@nextui-org/react';
import { useCallback, useTransition } from 'react';
import { IntersectionGeneratorMatrix } from '@/api/main';
import { useRouter } from 'next/navigation';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { initWorkProjectSeriesSchemas } from '@/utils/init-database-functions/initWorkProjectSeriesSchemas';
import { ServiceCategoryDto } from '@/api/dtos/ServiceCategoryDtoSchema';
import { PendingOverlay } from '@/components/overlays/pending-overlay';

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
            console.log(workTaskTypes);
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
    <div className={'w-fit h-fit'}>
      <PendingOverlay pending={isPending} />
      <IgmTableWrapper
        {...otherProps}
        columns={columns}
        submitTo={interceptedSubmitTo}
      />
    </div>
  );
}
