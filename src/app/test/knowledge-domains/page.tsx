import JsonTable from '@/app/test/_components/JsonTable';
import { applyColorPalette, raw } from '@/app/test/knowledge-domains/data';

export default async function Page() {
  const colored = applyColorPalette(raw);

  return (
    <div className={'m-4 rounded-lg bg-white py-4 shadow-lg'}>
      <JsonTable jsonList={colored} />
    </div>
  );
}
