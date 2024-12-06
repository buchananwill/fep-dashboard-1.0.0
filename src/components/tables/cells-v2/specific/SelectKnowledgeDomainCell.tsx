import { ProviderRoleDto } from '@/api/generated-types/generated-types';

import { Loading } from '@/components/feasibility-report/Loading';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/clientApi';
import { useDtoStoreDispatch } from 'dto-stores';
import { useCallback, useMemo, useState } from 'react';
import { EntityClassMap } from '@/api/entity-class-map';
import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { Autocomplete, Button, Modal, ModalProps } from '@mantine/core';

export function KnowledgeDomainSelectCell(
  props: IdInnerCellProps<string | undefined>
) {
  const { value } = props;
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button
        radius={'xs'}
        fullWidth
        variant={'subtle'}
        onClick={() => setOpened(true)}
      >
        {value}
      </Button>
      {opened && (
        <LocalModal
          {...props}
          opened={opened}
          onClose={() => setOpened(false)}
        />
      )}
    </>
  );
}

function LocalModal({
  entityClass,
  entityId,
  value,
  ...props
}: IdInnerCellProps<string | undefined> &
  Pick<ModalProps, 'onClose' | 'opened'>) {
  const getAllTypes = Api.KnowledgeDomain.getAll;
  const { onClose, opened } = props;

  const { data, isPending } = useQuery({
    queryKey: [EntityClassMap.knowledgeDomain, 'all'],
    queryFn: () => getAllTypes()
  });

  const { dispatchWithoutListen: dispatch } =
    useDtoStoreDispatch<ProviderRoleDto>(entityId, entityClass);

  const options: string[] = useMemo(() => {
    return data ? data.map((kd) => kd.name) : ([] as string[]);
  }, [data]);

  const [nextValue, setNextValue] = useState<string | undefined>(value);

  // useEffect(() => {
  //   if (data) {
  //     const foundOptional = data.find(
  //       (typeEntity) => typeEntity.name === value
  //     );
  //     setNextValue(foundOptional ? String(foundOptional.id) : undefined);
  //   }
  // }, [data, value]);

  const onChange = useCallback(
    (value: string | null) => {
      const validSelection = data?.some((datum) => datum.name === value);
      setNextValue(validSelection ? (value ?? undefined) : undefined);
    },
    [data]
  );

  return (
    <Modal opened={opened} onClose={onClose}>
      <div
        className={'center-all-margin flex w-fit flex-col justify-center gap-2'}
      >
        <h1>
          Select {getStartCaseDomainAlias(EntityClassMap.knowledgeDomain)}
        </h1>
        {!isPending && data !== undefined ? (
          <Autocomplete data={options} value={nextValue} onChange={onChange} />
        ) : (
          <Loading />
        )}

        <Button
          onClick={() => {
            dispatch((prev) => {
              const nextKd = nextValue
                ? data?.find((datum) => datum.name === nextValue)
                : undefined;
              return nextKd
                ? {
                    ...prev,
                    knowledgeDomainId: nextKd.id,
                    knowledgeDomainName: nextKd.name
                  }
                : {
                    ...prev,
                    knowledgeDomainName: undefined,
                    knowledgeDomainId: undefined
                  };
            });
            onClose();
          }}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
}
