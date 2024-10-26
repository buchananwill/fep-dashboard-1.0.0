import { SelectApiReturn } from '@/hooks/select-adaptors/selectApiTypes';
import { Select } from '@mantine/core';

export default function PolymorphicSelect<T>(props: SelectApiReturn) {
  switch (props.type) {
    case 'singleFlat': {
      const { type, ...remainingProps } = props;
      return <Select {...remainingProps} />;
    }
  }
}
