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
  },
  'data.name': {
    direction: 'asc',
    path: 'data.name'
  }
} as const;
