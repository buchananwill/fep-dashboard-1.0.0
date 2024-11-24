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
  UserGroupIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

// 16 is a good square number for the core nav menu. One-in-one-out from now on!
export const iconDefinitions = {
  navigation: GlobeAltIcon,
  cycles: ClockIcon,
  knowledgeDomains: AcademicCapIcon,
  knowledgeLevelSeries: ChartBarIcon,
  workTaskTypes: TagIcon,
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

export type NavigationType = keyof typeof iconDefinitions;

export const navKeyList = Object.keys(iconDefinitions) as NavigationType[];

const unusedIcons = {
  RectangleGroupIcon,
  RectangleStackIcon,
  ListBulletIcon,
  WrenchScrewdriverIcon,
  TableCellsIcon
};
