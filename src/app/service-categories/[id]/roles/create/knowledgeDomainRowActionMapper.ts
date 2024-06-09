'use server';
import { KnowledgeDomainRoleRowInterface } from '@/app/service-categories/[id]/roles/create/_components/KnowledgeDomainRoleRow';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';

import { BASE_URL } from '@/api/literals';

export async function knowledgeDomainRowActionMapper(
  rowList: KnowledgeDomainRoleRowInterface[]
) {
  const providerRoleMap = new Map<number, number>();
  const assetRoleMap = new Map<number, number>();
  rowList.forEach((row) => {
    providerRoleMap.set(row.id, row.providerRoleCount);
    assetRoleMap.set(row.id, row.assetRoleCount);
  });
  const providerRequest = Object.fromEntries(providerRoleMap);
  const assetRequest = Object.fromEntries(assetRoleMap);
  const providerPromise = postEntitiesWithDifferentReturnType(
    providerRequest,
    `${BASE_URL}/api/v2/providerRoles/generate/Teacher`
  );
  const assetPromise = postEntitiesWithDifferentReturnType(
    assetRequest,
    `${BASE_URL}/api/v2/assets/roles/generate/Class%20Room`
  );

  await Promise.all([providerPromise, assetPromise]);
}
