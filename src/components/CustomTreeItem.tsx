import { styled, useTheme } from '@mui/material/styles';
import {
  TreeItem2Content,
  TreeItem2GroupTransition,
  TreeItem2IconContainer,
  TreeItem2Root
} from '@mui/x-tree-view/TreeItem2';
import {
  unstable_useTreeItem2 as useTreeItem,
  UseTreeItem2Parameters
} from '@mui/x-tree-view/useTreeItem2';
import * as React from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';
import clsx from 'clsx';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

export interface StyledTreeItemProps
  extends Omit<UseTreeItem2Parameters, 'rootRef'>,
    React.HTMLAttributes<HTMLLIElement> {
  bgColor?: string;
  bgColorForDarkMode?: string;
  color?: string;
  colorForDarkMode?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  forceIconColor?: boolean;
}

const CustomTreeItemRoot = styled(TreeItem2Root)(({ theme }) => ({
  color: theme.palette.text.secondary
}));
const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  marginBottom: theme.spacing(0.3),
  color: theme.palette.text.secondary,
  borderRadius: theme.spacing(2),
  paddingRight: theme.spacing(1),
  fontWeight: theme.typography.fontWeightMedium,
  '&.expanded': {
    fontWeight: theme.typography.fontWeightRegular
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  },
  '&.focused, &.selected, &.selected.focused': {
    backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
    color: 'var(--tree-view-color)'
  }
}));
const CustomTreeItemIconContainer = styled(TreeItem2IconContainer)(
  ({ theme }) => ({
    marginRight: theme.spacing(1)
  })
);
const CustomTreeItemGroupTransition = styled(TreeItem2GroupTransition)(
  ({ theme }) => ({
    marginLeft: 0,
    [`& .content`]: {
      paddingLeft: theme.spacing(2)
    }
  })
);
export const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: StyledTreeItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  const theme = useTheme();
  const {
    id,
    itemId,
    label,
    disabled,
    children,
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    colorForDarkMode,
    bgColorForDarkMode,
    forceIconColor,
    ...other
  } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getLabelProps,
    getGroupTransitionProps,
    status
  } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });

  const style = {
    '--tree-view-color':
      theme.palette.mode !== 'dark' ? color : colorForDarkMode,
    '--tree-view-bg-color':
      theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode
  };

  const { children: labelChildren, sx } = getLabelProps({
    variant: 'body2',
    sx: { display: 'flex', fontWeight: 'inherit', flexGrow: 1 }
  });

  return (
    <TreeItem2Provider itemId={itemId}>
      <CustomTreeItemRoot {...getRootProps({ ...other, style })}>
        <CustomTreeItemContent
          {...getContentProps({
            className: clsx('content', {
              expanded: status.expanded,
              selected: status.selected,
              focused: status.focused
            })
          })}
        >
          <CustomTreeItemIconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </CustomTreeItemIconContainer>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              p: 0.5,
              pr: 0
            }}
          >
            <Box
              component={LabelIcon}
              color={forceIconColor ? color : 'inherit'}
              sx={{ mr: 1 }}
            />
            <div style={sx}>{labelChildren}</div>
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </Box>
        </CustomTreeItemContent>
        {children && (
          <CustomTreeItemGroupTransition {...getGroupTransitionProps()} />
        )}
      </CustomTreeItemRoot>
    </TreeItem2Provider>
  );
});
