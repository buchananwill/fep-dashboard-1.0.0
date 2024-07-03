'use client';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { Button } from '@nextui-org/button';
import { BulkRepeatPostRequest } from '@/api/types';

const getNextItemIndexCounter = (limit: number) => {
  let curr = 0;
  return () => (curr === limit ? -1 : curr++);
};

export default function GenerateOneButton({
  url,
  requestData
}: {
  url: string;
  requestData: BulkRepeatPostRequest<any>;
}) {
  return (
    <Button
      onPress={() => {
        postEntitiesWithDifferentReturnType(requestData, url);
      }}
      className={
        'border-2 border-emerald-500 bg-gradient-to-br from-red-400 to-emerald-400'
      }
    >
      {Object.keys(requestData.repeatPostRequestMap)[0]}
    </Button>
  );
}

export function GenerateAllButton({
  url,
  requestData
}: {
  url: string;
  requestData: BulkRepeatPostRequest<any>[];
}) {
  return (
    <Button
      onPress={() => {
        requestData.forEach((data) =>
          postEntitiesWithDifferentReturnType(data, url)
        );
      }}
      className={
        'col-span-4 border-2 border-emerald-500 bg-gradient-to-tl from-red-400 to-emerald-400'
      }
      size={'lg'}
    >
      Generate All
    </Button>
  );
}
