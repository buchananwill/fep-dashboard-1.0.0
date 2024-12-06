'use client';
import { Button } from '@mantine/core';
import { Api } from '@/api/clientApi';
import { GenericNestedDto } from '@/api/generated-types/generated-types_';
import { UserGuideMarkdown } from '@/app/user-guide/parseMarkdownToTree';
import { data } from '@/app/user-guide/graph-view/data';

export function ButtonToInsert() {
  return (
    <Button
      onClick={() =>
        Api.UserGuideMarkdown.postByNestedEntityList(
          data as unknown as GenericNestedDto<UserGuideMarkdown>[]
        )
      }
    >
      INSERT!
    </Button>
  );
}
