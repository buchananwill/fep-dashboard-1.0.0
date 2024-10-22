export const defaultSortState = {
  direction: 'asc',
  path: ''
} as const;

export const Sorts = {
  none: {
    direction: 'asc',
    path: ''
  },
  name: {
    direction: 'asc',
    path: 'name'
  }
} as const;
