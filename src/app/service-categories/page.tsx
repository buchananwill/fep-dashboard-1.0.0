import { getPage } from '@/app/api/generated-actions/ServiceCategory';
import { EntityClassMap } from '@/api/entity-class-map';
import { LinkListResourcePage } from '@/components/generic/LinkListResourcePage';
import NameAccessorContextProvider from '@/components/providers/text-accessor-context/NameAccessorContextProvider';

export default async function Page() {
  const dtoPage = await getPage({ page: 0, pageSize: 10 });

  return (
    <main className={'p-8'}>
      <NameAccessorContextProvider>
        <LinkListResourcePage
          entityName={EntityClassMap.serviceCategory}
          dtoList={dtoPage.content}
        />
      </NameAccessorContextProvider>
    </main>
  );
}
