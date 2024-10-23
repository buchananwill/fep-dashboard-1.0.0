import { Indicator, IndicatorProps } from '@mantine/core';

export function ClashBadge({
  show,
  className,
  children,
  content,
  ...otherProps
}: Pick<IndicatorProps, 'className' | 'children' | 'content'> & {
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
      label={content}
      radius={'xl'}
      size={'lg'}
    >
      {children}
    </Indicator>
  );
}
