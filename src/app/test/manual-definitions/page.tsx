import { getWithoutBody } from '@/api/actions/template-actions';
import { BASE_URL } from '@/api/BASE_URL';
import JsonTable from '@/app/test/_components/JsonTable';
import {
  DataRow,
  mapToNewRows,
  rowCopies
} from '@/app/test/manual-definitions/data';
import PostButton from './PostButton';

export default async function Page() {
  const manualDefinitions = await getWithoutBody<{}[]>(
    `${BASE_URL}/api/v2/workSchemaNodes/manualDefinitions`
  );

  return (
    <div className={'m-4 rounded-lg bg-white shadow-lg'}>
      <PostButton rowCopies={mapToNewRows(manualDefinitions as DataRow[])} />
      <JsonTable jsonList={manualDefinitions} />
    </div>
  );
}
