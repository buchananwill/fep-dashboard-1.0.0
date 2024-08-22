import {
  GenericNestedDto,
  KnowledgeDomainDto
} from '@/api/generated-types/generated-types';

interface NestedKnowledgeDomain {
  children?: NestedKnowledgeDomain[];
  name: string;
  id: number;
  shortCode?: string;
}

type NestedKd = GenericNestedDto<KnowledgeDomainDto>;

function transformToGenericNested<T extends { children?: T[] }>(
  node: T
): GenericNestedDto<Omit<T, 'children'>> {
  const { children, ...data } = node;
  let transformedChildren: GenericNestedDto<Omit<T, 'children'>>[] = [];
  if (children) {
    transformedChildren = children.map((childT) =>
      transformToGenericNested(childT)
    );
  }
  return { data: data, children: transformedChildren };
}

const csvpaKdomains: NestedKnowledgeDomain = {
  name: 'Subjects',
  id: 1,
  children: [
    {
      name: 'Academic Subjects',
      id: 2,
      children: []
    },
    {
      name: 'Instrumental Subjects',
      id: 3,
      children: [
        {
          name: 'Piano',
          id: 4,
          children: [
            { name: 'Classical Piano', id: 5 },
            { name: 'Jazz/Pop Piano', id: 6 }
          ]
        },
        {
          name: 'Percussion',
          id: 7,
          children: [
            { name: 'Drum Kit', id: 8 },
            {
              name: 'Tuned Percussion',
              id: 9,
              children: [
                { name: 'Xylophone', id: 13 },
                { name: 'Marimba', id: 14 },
                { name: 'Vibraphone', id: 15 },
                { name: 'Glockenspiel', id: 16 }
              ]
            },
            {
              name: 'Hand Percussion',
              id: 10,
              children: [
                { name: 'Congas', id: 17 },
                { name: 'Bongos', id: 18 },
                { name: 'Djembe', id: 19 },
                { name: 'Cajón', id: 20 }
              ]
            }
          ]
        },
        {
          name: 'Brass',
          id: 11,
          children: [
            { name: 'Trumpet', id: 12 },
            { name: 'Trombone', id: 21 },
            { name: 'French Horn', id: 22 },
            { name: 'Tuba', id: 23 },
            { name: 'Cornet', id: 24 },
            { name: 'Euphonium', id: 25 }
          ]
        },
        {
          name: 'Woodwind',
          id: 26,
          children: [
            { name: 'Flute', id: 27 },
            { name: 'Clarinet', id: 28 },
            { name: 'Oboe', id: 29 },
            { name: 'Bassoon', id: 30 },
            { name: 'Saxophone', id: 31 }
          ]
        },
        {
          name: 'Strings',
          id: 32,
          children: [
            { name: 'Violin', id: 33 },
            { name: 'Viola', id: 34 },
            { name: 'Cello', id: 35 },
            { name: 'Double Bass', id: 36 },
            { name: 'Harp', id: 37 },
            {
              name: 'Guitar',
              id: 38,
              children: [
                { name: 'Classical Guitar', id: 39 },
                { name: 'Electric Guitar', id: 40 },
                { name: 'Acoustic Guitar', id: 41 }
              ]
            },
            { name: 'Mandolin', id: 42 },
            { name: 'Ukulele', id: 43 }
          ]
        },
        {
          name: 'Keyboard',
          id: 44,
          children: [
            { name: 'Organ', id: 45 },
            { name: 'Harpsichord', id: 46 },
            { name: 'Synthesizer', id: 47 }
          ]
        },
        {
          name: 'Electronic Instruments',
          id: 48,
          children: [
            { name: 'Electronic Drum Kit', id: 49 },
            { name: 'Turntables', id: 50 },
            { name: 'Sampler', id: 51 }
          ]
        },
        {
          name: 'Vocal',
          id: 52,
          children: [
            { name: 'Classical Voice', id: 53 },
            { name: 'Jazz/Pop Voice', id: 54 },
            { name: 'Choral Singing', id: 55 }
          ]
        }
      ]
    }
  ]
};
