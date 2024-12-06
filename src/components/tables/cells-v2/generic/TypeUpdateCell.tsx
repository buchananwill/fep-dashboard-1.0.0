import { TypeDto } from '@/api/generated-types/generated-types_';
import { EntityApiKey, HasId } from '@/api/types';

import { Loading } from '@/components/feasibility-report/Loading';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/clientApi';
import { useDtoStoreDispatch } from 'dto-stores';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { Button, Modal, ModalProps, Select } from '@mantine/core';

import { SimpleSelectable } from '@/components/types/types';

type DtoWithType<T extends TypeDto<any, any>> = {
  type: T;
} & HasId;

export function CellContent(
  props: IdInnerCellProps<string> & { typeEntity: EntityApiKey }
) {
  const [opened, setOpened] = useState(false);
  const { value } = props;

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
  typeEntity,
  value,
  entityId,
  ...props
}: IdInnerCellProps<string> & { typeEntity: EntityApiKey } & Pick<
    ModalProps,
    'onClose' | 'opened'
  >) {
  const getAllTypes = Api[typeEntity].getAll as () => Promise<
    TypeDto<any, any>[]
  >;
  const { onClose, opened } = props;

  const { data, isPending } = useQuery({
    queryKey: [typeEntity, 'all'],
    queryFn: () => getAllTypes()
  });

  const { dispatchWithoutListen: dispatch } = useDtoStoreDispatch<
    DtoWithType<any>
  >(entityId, entityClass);

  const options: SimpleSelectable[] = useMemo(() => {
    return data
      ? data.map((typeEntity) => ({
          value: String(typeEntity.id),
          label: typeEntity.name
        }))
      : ([] as SimpleSelectable[]);
  }, [data]);

  const [nextValue, setNextValue] = useState(value);

  useEffect(() => {
    if (data) {
      const foundOptional = data.find(
        (typeEntity) => typeEntity.name === value
      );
      if (!foundOptional)
        throw Error(`Could not find type in database: ${value}`);
      setNextValue(String(foundOptional.id));
    }
  }, [data, value]);

  const onChange = useCallback((value: string | null) => {
    if (value === null) throw Error('Empty selection not allowed here.');
    setNextValue(value);
  }, []);

  return (
    <Modal opened={opened} onClose={onClose}>
      <div
        className={'center-all-margin flex w-fit flex-col justify-center gap-2'}
      >
        <h1>Select {getStartCaseDomainAlias(typeEntity)}</h1>
        {!isPending && data !== undefined ? (
          <Select data={options} value={nextValue} onChange={onChange} />
        ) : (
          <Loading />
        )}

        <Button
          onClick={() => {
            dispatch((prev) => {
              const nextType = data?.find(
                (datum) => datum.id === parseInt(nextValue)
              );
              return nextType ? { ...prev, type: nextType } : prev;
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

export function getTypeUpdateCell<T extends DtoWithType<any>>(
  typeEntity: EntityApiKey
) {
  return function TypeUpdateCell(props: IdInnerCellProps<string>) {
    return <CellContent {...props} typeEntity={typeEntity} />;
  };
}
