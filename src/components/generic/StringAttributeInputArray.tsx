// Utility type to filter keys pointing to string values
import { Input } from '@nextui-org/input';

export type StringPropertyNames<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface StringAttributeInputProps<T> {
  entity: T;
  attributeKey: StringPropertyNames<T>;
  update: (value: string, attributeKey: StringPropertyNames<T>) => void;
}

function StringAttributeInput<T>({
  entity,
  attributeKey,
  update
}: StringAttributeInputProps<T>) {
  return (
    <Input
      type="text"
      label={attributeKey as string}
      value={(entity[attributeKey] as string) ?? ''}
      onValueChange={(value) => update(value, attributeKey)}
    />
  );
}

export function StringAttributeInputArray<T>({
  entity,
  attributeKeys,
  update
}: {
  entity: T;
  attributeKeys: StringPropertyNames<T>[];
  update: (value: string, attributeKey: StringPropertyNames<T>) => void;
}) {
  return attributeKeys.map((key) => (
    <StringAttributeInput
      key={key as string}
      entity={entity}
      attributeKey={key}
      update={update}
    />
  ));
}
