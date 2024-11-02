import JsonTable from '@/app/test/_components/JsonTable';
import { applyColorPalette, raw } from '@/app/test/knowledge-domains/data';
import PostButton from '@/app/test/knowledge-domains/PostButton';
import { mapToNewRows } from '@/app/test/manual-definitions/data';

export default async function Page() {
  const colored = applyColorPalette(
    raw
    // mapToNewRows(raw)
  );

  return (
    <div className={'m-4 rounded-lg bg-white py-4 shadow-lg'}>
      <PostButton rowCopies={colored} />
      <JsonTable jsonList={colored} />
    </div>
  );
}
