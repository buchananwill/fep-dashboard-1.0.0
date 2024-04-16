import { getPage } from '@/app/api/generated-actions/ServiceCategory';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import { MissingData } from '@/components/generic/MissingData';
import { LinkListResourcePage } from '@/components/generic/LinkListResourcePage';

export default async function Page() {
  const { data } = await getPage({ page: 0, pageSize: 10 });

  if (data === undefined) return <MissingData />;

  return (
    <main className={'p-8'}>
      <LinkListResourcePage
        entityName={EntityNamesMap.serviceCategory}
        dtoList={data.content}
      />
    </main>
  );
}
