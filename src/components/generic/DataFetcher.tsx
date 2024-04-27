import { ActionResponsePromise } from '@/app/api/actions/actionResponse';
import DataNotFoundModal from '@/components/generic/MissingDataModal';
import { DtoListChangesTracker } from '@/components/generic/DtoChangesTracker';
import { HasId } from '@/app/api/main';

export interface DataFetcherProps<T> {
  serverActionSupplier: () => ActionResponsePromise<T>;
  entityClass: string;
  updateServerAction?: (entityList: T[]) => Promise<any>;
  deleteServerAction?: (idList: any[]) => Promise<any>;
}

export default async function DataFetcher<T extends HasId>({
  serverActionSupplier,
  entityClass,
  deleteServerAction,
  updateServerAction
}: DataFetcherProps<T>) {
  const actionResponse = await serverActionSupplier();
  const { data } = actionResponse;

  if (data === undefined)
    return (
      <DataNotFoundModal
        message={actionResponse.message || 'Data not found.'}
      />
    );

  if (Array.isArray(data))
    return (
      <DtoListChangesTracker
        dtoList={data}
        entityName={entityClass}
        deleteServerAction={deleteServerAction}
        updateServerAction={updateServerAction}
      />
    );
  else
    return (
      <DtoListChangesTracker
        dtoList={[data]}
        entityName={entityClass}
        deleteServerAction={deleteServerAction}
        updateServerAction={updateServerAction}
      />
    );
}
