'use client';
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import Label from '@mui/icons-material/Label';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { CustomTreeItem } from '@/app/test/CustomTreeItem';

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

function EndIcon() {
  return <div style={{ width: 24 }} />;
}

export default function GmailTreeView() {
  return (
    <SimpleTreeView
      aria-label="gmail"
      defaultExpandedItems={['3']}
      defaultSelectedItems="5"
      slots={{
        expandIcon: ArrowRightIcon,
        collapseIcon: ArrowDropDownIcon,
        endIcon: EndIcon
      }}
      sx={{ flexGrow: 1, maxWidth: 400 }}
    >
      <CustomTreeItem itemId="1" label="All Mail" labelIcon={MailIcon} />
      <CustomTreeItem itemId="2" label="Trash" labelIcon={DeleteIcon} />
      <CustomTreeItem itemId="3" label="Categories" labelIcon={Label}>
        <CustomTreeItem
          itemId="5" // id for tree item
          label="Social" // text for item
          labelIcon={SupervisorAccountIcon} // icon for item
          labelInfo="90" // small text align right
          color="#1a73e8" // Override for foreground color
          bgColor="#e8f0fe" // override for background color
          colorForDarkMode="#B8E7FB" // dark fg override
          bgColorForDarkMode={alpha('#00b4ff', 0.2)} // dark bg override
        />
        <CustomTreeItem
          itemId="6"
          label="Updates"
          labelIcon={InfoIcon}
          labelInfo="2,294"
          color="#e3742f"
          bgColor="#fcefe3"
          colorForDarkMode="#FFE2B7"
          bgColorForDarkMode={alpha('#ff8f00', 0.2)}
        />
        <CustomTreeItem
          itemId="7"
          label="Forums"
          labelIcon={ForumIcon}
          labelInfo="3,566"
          color="#a250f5"
          bgColor="#f3e8fd"
          colorForDarkMode="#D9B8FB"
          bgColorForDarkMode={alpha('#9035ff', 0.15)}
        />
        <CustomTreeItem
          itemId="8"
          label="Promotions"
          labelIcon={LocalOfferIcon}
          labelInfo="733"
          color="#3c8039"
          bgColor="#e6f4ea"
          colorForDarkMode="#CCE8CD"
          bgColorForDarkMode={alpha('#64ff6a', 0.2)}
        />
      </CustomTreeItem>
      <CustomTreeItem itemId="4" label="History" labelIcon={Label} />
    </SimpleTreeView>
  );
}
