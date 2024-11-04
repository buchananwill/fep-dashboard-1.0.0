import { getWithoutBody } from '@/api/actions/template-actions';
import { BASE_URL } from '@/api/BASE_URL';
import JsonTable from '@/app/test/_components/JsonTable';
import { nestedData } from '@/app/test/provider-roles/data2';

export default async function Page() {
  return (
    <div className={'m-4 rounded-lg bg-white shadow-lg'}>
      {/*<PostButton rowCopies={mapToNewRows(manualDefinitions as DataRow[])} />*/}
      <pre>{JSON.stringify(nestedData, null, 2)}</pre>
    </div>
  );
}
