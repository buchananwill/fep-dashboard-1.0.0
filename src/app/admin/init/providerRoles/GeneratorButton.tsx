'use client';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { Button } from '@nextui-org/button';
import { BulkRepeatPostRequest } from '@/api/types';
import { ProviderRolePostRequest } from '@/api/dtos/ProviderRolePostRequestSchema';
import { bulkPipeline } from '@/utils/init-object-literals/providerRoleBulkRequest';

const getNextItemIndexCounter = (limit: number) => {
  let curr = 0;
  return () => (curr === limit ? -1 : curr++);
};

export default function GeneratorButton({ url }: { url: string }) {
  return (
    <Button
      onPress={() => {
        const counter = getNextItemIndexCounter(bulkPipeline.length);
        const processPipeline = async () => {
          let nextIndex = counter();
          try {
            while (nextIndex >= 0) {
              const response = await postEntitiesWithDifferentReturnType(
                bulkPipeline[nextIndex],
                url
              );
              nextIndex = counter();
            }
          } catch (err) {
            console.error(err);
          }
        };

        bulkPipeline.forEach(
          (request: BulkRepeatPostRequest<ProviderRolePostRequest>) => {
            console.log(request);
          }
        );
      }}
    >
      Test generate providers!
    </Button>
  );
}
