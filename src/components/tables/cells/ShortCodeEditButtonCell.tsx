import { NextUiCellComponentProps } from '@/components/tables/GetCellRenderFunction';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import React, { CSSProperties, useMemo } from 'react';
import { getShortCodeColor } from '@/functions/getShortcodeColor';
import { parseToCssRgba } from '@/components/tables/edit-v2/parseToCssRgba';
import { EditStringUniqueConstraintButton } from '@/components/tables/edit-tables/EditStringUniqueConstraintButton';

export function ShortCodeEditButtonCell(
  props: NextUiCellComponentProps<KnowledgeDomainDto>
) {
  const classNames = useMemo(() => {
    const {
      entity: { shortCode, color }
    } = props;
    const shortCodeColor = getShortCodeColor(shortCode ?? '');
    return shortCodeColor !== 'bg-white' ? { button: shortCodeColor } : {};
  }, [props]);

  const {
    entity: { color }
  } = props;
  const colorFromEntity = useMemo(() => {
    return parseToCssRgba(color);
  }, [color]);

  const styleAndClassnames = useMemo(() => {
    if (colorFromEntity) {
      const cssStyle: CSSProperties = {
        backgroundColor: colorFromEntity
      };
      return { style: cssStyle };
    } else return { classNames };
  }, [colorFromEntity, classNames]);

  return (
    <EditStringUniqueConstraintButton {...props} {...styleAndClassnames} />
  );
}
