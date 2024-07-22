import {
  AcademicCapIcon,
  ArrowPathRoundedSquareIcon,
  ArrowUpOnSquareStackIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ClockIcon,
  GlobeAltIcon,
  ListBulletIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  ShareIcon,
  SquaresPlusIcon,
  TableCellsIcon,
  TagIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export const navLinkIcons = {
  cycles: ClockIcon,
  scheduling: CalendarDaysIcon,
  serviceCategories: TagIcon,
  knowledgeDomains: AcademicCapIcon,
  knowledgeLevels: ChartBarIcon,
  workTaskType: TableCellsIcon,
  workProjectSeriesSchema: SquaresPlusIcon,
  workSchemaNodes: ShareIcon,
  workSchemaNodeAssignments: ArrowUpOnSquareStackIcon,
  users: UserGroupIcon,
  providers: BriefcaseIcon,
  assets: BuildingOfficeIcon,
  carouselGroups: ArrowPathRoundedSquareIcon,
  navigation: GlobeAltIcon
} as const;

export type NavigationType = keyof typeof navLinkIcons;

export const navKeyList = Object.keys(navLinkIcons) as NavigationType[];

const unusedIcons = {
  RectangleGroupIcon,
  RectangleStackIcon,
  ListBulletIcon
};
