import { getWithoutBody } from '@/api/actions/template-actions';
import { BASE_URL } from '@/api/BASE_URL';
import JsonTable from '@/app/test/_components/JsonTable';
import PostButton from '@/app/test/auto-carousel-group-options/PostButton';
import { mapToOptionCopies } from '@/functions/data-transforms';

export default async function Page() {
  const autoCarouselOptions = await getWithoutBody<
    { carouselGroupName: string }[]
  >(`${BASE_URL}/api/v2/workSchemaNodes/autoCarouselGroupOptions`);

  return (
    <div className={'m-4 rounded-lg bg-white py-4 shadow-lg'}>
      <JsonTable jsonList={autoCarouselOptions} />
    </div>
  );
}
