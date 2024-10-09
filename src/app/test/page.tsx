'use client';

import { pipelineAsJson } from '@/utils/init-object-literals/assetRoleBulkRequest';

export default function page() {
  return <div>{pipelineAsJson}</div>;
}
