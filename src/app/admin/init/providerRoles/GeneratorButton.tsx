'use client';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { bulkRequestList } from '@/utils/init-object-literals/providerRoleBulkRequest';
import { Button } from '@nextui-org/button';

export default function GeneratorButton({ url }: { url: string }) {
  return (
    <Button
      onPress={() => {
        bulkRequestList.forEach((request) => {
          postEntitiesWithDifferentReturnType(request, url);
        });
      }}
    >
      Test generate providers!
    </Button>
  );
}
