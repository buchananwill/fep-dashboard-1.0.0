import { getWithoutBody } from '@/api/actions/template-actions';
import { BASE_URL } from '@/api/BASE_URL';
import JsonTable from '@/app/test/_components/JsonTable';
import PostButton from '@/app/test/auto-carousel-group-options/PostButton';
import { mapToOptionCopies } from '@/app/test/manual-definitions/data';

export default async function Page() {
  const autoCarouselOptions = await getWithoutBody<
    { carouselGroupName: string }[]
  >(`${BASE_URL}/api/v2/workSchemaNodes/autoCarouselGroupOptions`);

  console.log(autoCarouselOptions);

  return (
    <div className={'m-4 rounded-lg bg-white py-4 shadow-lg'}>
      <PostButton rowCopies={mapToOptionCopies(autoCarouselOptions)} />
      <JsonTable jsonList={autoCarouselOptions} />
    </div>
  );
}
