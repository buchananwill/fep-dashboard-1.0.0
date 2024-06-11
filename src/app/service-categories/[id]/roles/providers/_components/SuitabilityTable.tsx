'use client';
import { EditAddDeleteDtoControllerArray, NamespacedHooks } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import NumberEditCellList from '@/app/service-categories/[id]/roles/_components/NumberEditCellList';
import { ProviderRoleTypeWorkTaskTypeSuitabilityDto } from '@/api/dtos/ProviderRoleTypeWorkTaskTypeSuitabilityDtoSchema';
import clsx from 'clsx';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { ProviderRoleSuitabilityApi } from '@/api/clientApi';
import { useEffect, useState } from 'react';
import { ConditionalNumberClassName } from '@/components/generic/DtoStoreNumberInput';

export default function SuitabilityTable({
  partyIdList,
  providerRoleTypeId
}: {
  partyIdList: number[];
  providerRoleTypeId: number;
}) {
  const listenerKey = useUuidListenerKey();
  const { currentState: selectedWTT } = NamespacedHooks.useListen(
    EntityClassMap.workTaskType,
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray as number[]
  );
  const { currentState: suitabilities, dispatchWithoutControl } =
    NamespacedHooks.useDispatchAndListen(
      EntityClassMap.providerRoleTypeWorkTaskTypeSuitability,
      KEY_TYPES.MASTER_LIST,
      listenerKey,
      EmptyArray as ProviderRoleTypeWorkTaskTypeSuitabilityDto[]
    );
  const [dataResponse, setDataResponse] = useState<
    Record<string, ProviderRoleTypeWorkTaskTypeSuitabilityDto[]>
  >({});

  useEffect(() => {
    ProviderRoleSuitabilityApi.getTriIntersectionTable(
      partyIdList,
      selectedWTT,
      providerRoleTypeId
    ).then((idReferencedIntersectionTableDto) => {
      const flatList = Object.values(idReferencedIntersectionTableDto).flatMap(
        (list) => [...list]
      );
      dispatchWithoutControl(flatList);
      setDataResponse(idReferencedIntersectionTableDto);
    });
  }, [dispatchWithoutControl, providerRoleTypeId, partyIdList, selectedWTT]);

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.providerRoleTypeWorkTaskTypeSuitability}
        dtoList={EmptyArray}
        mergeInitialWithProp={true}
        updateServerAction={ProviderRoleSuitabilityApi.putList}
      />
      <table>
        <tbody>
          {Object.entries(dataResponse).map(([partyId, list]) => (
            <tr key={partyId}>
              <NumberEditCellList<ProviderRoleTypeWorkTaskTypeSuitabilityDto>
                cellIdList={list.map((rating) => rating.id)}
                entityClass={
                  EntityClassMap.providerRoleTypeWorkTaskTypeSuitability
                }
                numberKey={'rating'}
                min={0}
                allowFloat={true}
                className={clsx('m-0 h-8 w-8')}
                conditionalValueClassNames={conditionalNumberFormatting}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

const conditionalNumberFormatting: ConditionalNumberClassName[] = [
  { startAt: -1, className: 'opacity-50' },
  { startAt: 0, className: '' },
  { startAt: 1, className: ' bg-red-100' },
  { startAt: 2, className: ' bg-amber-100' },
  { startAt: 3, className: ' bg-yellow-100' },
  { startAt: 4, className: ' bg-emerald-100' }
];
