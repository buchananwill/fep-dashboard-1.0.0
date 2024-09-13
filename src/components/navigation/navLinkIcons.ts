import {
  AcademicCapIcon,
  ArrowPathRoundedSquareIcon,
  ArrowUpOnSquareStackIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ClockIcon,
  CpuChipIcon,
  GlobeAltIcon,
  ListBulletIcon,
  NewspaperIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  ShareIcon,
  SquaresPlusIcon,
  TableCellsIcon,
  TagIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

// 16 is a good square number for the core nav menu. One-in-one-out from now on!
export const navLinkIcons = {
  navigation: GlobeAltIcon,
  cycles: ClockIcon,
  knowledgeDomains: AcademicCapIcon,
  knowledgeLevelSeries: ChartBarIcon,
  workTaskTypes: TableCellsIcon,
  workProjectSeriesSchemas: SquaresPlusIcon,
  providers: BriefcaseIcon,
  assets: BuildingOfficeIcon,
  users: UserGroupIcon,
  carouselGroups: ArrowPathRoundedSquareIcon,
  workSchemaNodes: ShareIcon,
  workSchemaNodeAssignments: ArrowUpOnSquareStackIcon,
  feasibility: NewspaperIcon,
  autoScheduling: CpuChipIcon,
  schedules: CalendarDaysIcon
} as const;

export type NavigationType = keyof typeof navLinkIcons;

export const navKeyList = Object.keys(navLinkIcons) as NavigationType[];

const unusedIcons = {
  RectangleGroupIcon,
  RectangleStackIcon,
  ListBulletIcon,
  TagIcon
};
