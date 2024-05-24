import { EntityClassMap } from '@/api/entity-class-map';
import { LinkListResourcePage } from '@/components/generic/LinkListResourcePage';
import NameAccessorContextProvider from '@/components/providers/text-accessor-context/NameAccessorContextProvider';
import { getPage } from '@/api/generated-actions/ServiceCategory';

export default async function Page() {
  const dtoPage = await getPage({ page: 0, pageSize: 10 });

  return (
    <main className={'p-8'}>
      <NameAccessorContextProvider>
        <LinkListResourcePage
          entityClass={EntityClassMap.serviceCategory}
          dtoList={dtoPage.content}
        />
      </NameAccessorContextProvider>
    </main>
  );
}
