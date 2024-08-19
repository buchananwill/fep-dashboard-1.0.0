import {
  ControlledSlider,
  FormSliderProps
} from '@/components/react-hook-form/ControlledSlider';
import {
  ControlledInput,
  FormInputProps
} from '@/components/react-hook-form/ControlledInput';
import {
  ControlledSelect,
  FormSelectProps
} from '@/components/react-hook-form/ControlledSelect';
import { Paths } from 'type-fest';
import { OptionMap } from '@/components/work-task-types/CreateWorkTaskType';

export default function ControlledFormElement<T>({
  elementType,
  innerProps,
  optionMap
}: ControlledFormElementProps<T> & {
  optionMap: Partial<OptionMap<T>>;
}) {
  switch (elementType) {
    case 'Slider':
      return <ControlledSlider {...innerProps} />;
    case 'Select': {
      const options = optionMap[innerProps.name as keyof T] ?? [];
      const { children, ...otherProps } = innerProps;
      return <ControlledSelect {...otherProps}>{children}</ControlledSelect>;
    }
    case 'Input':
      return <ControlledInput {...innerProps} />;
    default:
      throw Error('Unsupported element type:', elementType);
  }
}

export type FormElementMapBase<T> = {
  [Property in Paths<T>]: FormElementTypes;
};

export type FormElementMap<T> = Partial<FormElementMapBase<T>>;

export type ControlledFormElementProps<T> =
  | ControlledInputElementProps
  | ControlledSliderElementProps
  | ControlledSelectElementProps;
type ControlledSliderElementProps = {
  elementType: 'Slider';
  innerProps: FormSliderProps;
};

type ControlledInputElementProps = {
  elementType: 'Input';
  innerProps: FormInputProps;
};

type ControlledSelectElementProps = {
  elementType: 'Select';
  innerProps: FormSelectProps;
};

type FormElementTypes = ControlledFormElementProps<any>['elementType'];
