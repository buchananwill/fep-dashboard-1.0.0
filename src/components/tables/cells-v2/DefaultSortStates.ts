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
  },
  'data.baseEntity.name': {
    direction: 'asc',
    path: 'data.baseEntity.name'
  },
  'data.baseEntity.lName': {
    direction: 'asc',
    path: 'data.baseEntity.lName'
  },
  carouselGroupName: {
    direction: 'asc',
    path: 'carouselGroupName'
  }
} as const;
