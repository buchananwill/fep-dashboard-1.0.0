import { constructUrl } from '@/api/actions/template-base-endpoints';
import GenerateOneButton, {
  GenerateAllButton
} from '@/app/admin/init/providerRoles/GenerateOneButton';
import {
  bulkPipeline,
  pipelineAsJson
} from '@/utils/init-object-literals/providerRoleBulkRequest';

export default async function page() {
  const url = constructUrl('/api/v2/generate/providerRoles');

  return (
    <div className={'grid grid-cols-4 gap-4 p-4'}>
      {bulkPipeline.map((request, index) => (
        <GenerateOneButton url={url} requestData={request} key={index} />
      ))}
      <GenerateAllButton url={url} requestData={bulkPipeline} />
    </div>
  );
}
