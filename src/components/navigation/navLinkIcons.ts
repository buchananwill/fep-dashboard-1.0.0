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
  serviceCategories: TagIcon,
  knowledgeDomains: AcademicCapIcon,
  knowledgeLevels: ChartBarIcon,
  workTaskTypes: TableCellsIcon,
  workProjectSeriesSchemas: SquaresPlusIcon,
  users: UserGroupIcon,
  providers: BriefcaseIcon,
  assets: BuildingOfficeIcon,
  carouselGroups: ArrowPathRoundedSquareIcon,
  workSchemaNodes: ShareIcon,
  workSchemaNodeAssignments: ArrowUpOnSquareStackIcon,
  feasibility: NewspaperIcon,
  autoSchedule: CpuChipIcon,
  scheduling: CalendarDaysIcon
} as const;

export type NavigationType = keyof typeof navLinkIcons;

export const navKeyList = Object.keys(navLinkIcons) as NavigationType[];

const unusedIcons = {
  RectangleGroupIcon,
  RectangleStackIcon,
  ListBulletIcon
};
