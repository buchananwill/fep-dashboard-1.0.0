import { Indicator, IndicatorProps } from '@mantine/core';

export function ClashBadge({
  show,
  className,
  children,
  label,
  ...otherProps
}: Pick<IndicatorProps, 'className' | 'children' | 'label' | 'offset'> & {
  show: boolean;
}) {
  return (
    <Indicator
      styles={{
        indicator: {
          userSelect: 'none'
        }
      }}
      disabled={!show}
      color={'red'}
      {...otherProps}
      label={label}
      radius={'xl'}
      size={'lg'}
    >
      {children}
    </Indicator>
  );
}
