import { getPage } from '@/app/api/generated-actions/ServiceCategory';
import { EntityClassMap } from '@/app/api/entity-class-map';
import { LinkListResourcePage } from '@/components/generic/LinkListResourcePage';
import ResourceContextProvider from '@/components/providers/resource-context/ResourceContextProvider';

export default async function Page() {
  const dtoPage = await getPage({ page: 0, pageSize: 10 });

  return (
    <main className={'p-8'}>
      <LinkListResourcePage
        entityName={EntityClassMap.serviceCategory}
        dtoList={dtoPage.content}
      />
    </main>
  );
}
