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

export function transformToGenericNested<T extends { children?: T[] }>(
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

const csvpaKdomains: GenericNestedDto<KnowledgeDomainDto> = {
  data: {
    name: 'Subjects',
    id: 1,
    shortCode: 'su'
  },
  children: [
    {
      data: {
        name: 'Instrumental Subjects',
        id: 3,
        shortCode: 'is'
      },
      children: [
        {
          data: {
            name: 'Piano',
            id: 4,
            shortCode: 'Pn'
          },
          children: [
            {
              data: {
                name: 'Classical Piano',
                id: 5,
                shortCode: 'CP'
              },
              children: []
            },
            {
              data: {
                name: 'Jazz/Pop Piano',
                id: 6,
                shortCode: 'JP'
              },
              children: []
            }
          ]
        },
        {
          data: {
            name: 'Percussion',
            id: 7,
            shortCode: 'Pc'
          },
          children: [
            {
              data: {
                name: 'Drum Kit',
                id: 8,
                shortCode: 'DK'
              },
              children: []
            },
            {
              data: {
                name: 'Tuned Percussion',
                id: 9,
                shortCode: 'TP'
              },
              children: [
                {
                  data: {
                    name: 'Xylophone',
                    id: 13,
                    shortCode: 'Xy'
                  },
                  children: []
                },
                {
                  data: {
                    name: 'Marimba',
                    id: 14,
                    shortCode: 'Mb'
                  },
                  children: []
                },
                {
                  data: {
                    name: 'Vibraphone',
                    id: 15,
                    shortCode: 'Vb'
                  },
                  children: []
                },
                {
                  data: {
                    name: 'Glockenspiel',
                    id: 16,
                    shortCode: 'Gl'
                  },
                  children: []
                }
              ]
            },
            {
              data: {
                name: 'Hand Percussion',
                id: 10,
                shortCode: 'HP'
              },
              children: [
                {
                  data: {
                    name: 'Congas',
                    id: 17,
                    shortCode: 'Cg'
                  },
                  children: []
                },
                {
                  data: {
                    name: 'Bongos',
                    id: 18,
                    shortCode: 'Bn'
                  },
                  children: []
                },
                {
                  data: {
                    name: 'Djembe',
                    id: 19,
                    shortCode: 'Db'
                  },
                  children: []
                },
                {
                  data: {
                    name: 'Cajón',
                    id: 20,
                    shortCode: 'Cj'
                  },
                  children: []
                }
              ]
            }
          ]
        },
        {
          data: {
            name: 'Brass',
            id: 11,
            shortCode: 'Br'
          },
          children: [
            {
              data: {
                name: 'Trumpet',
                id: 12,
                shortCode: 'Tp'
              },
              children: []
            },
            {
              data: {
                name: 'Trombone',
                id: 21,
                shortCode: 'Tb'
              },
              children: []
            },
            {
              data: {
                name: 'French Horn',
                id: 22,
                shortCode: 'FH'
              },
              children: []
            },
            {
              data: {
                name: 'Tuba',
                id: 23,
                shortCode: 'Tu'
              },
              children: []
            },
            {
              data: {
                name: 'Cornet',
                id: 24,
                shortCode: 'Cn'
              },
              children: []
            },
            {
              data: {
                name: 'Euphonium',
                id: 25,
                shortCode: 'Eu'
              },
              children: []
            }
          ]
        },
        {
          data: {
            name: 'Woodwind',
            id: 26,
            shortCode: 'Wd'
          },
          children: [
            {
              data: {
                name: 'Flute',
                id: 27,
                shortCode: 'Fl'
              },
              children: []
            },
            {
              data: {
                name: 'Clarinet',
                id: 28,
                shortCode: 'Cl'
              },
              children: []
            },
            {
              data: {
                name: 'Oboe',
                id: 29,
                shortCode: 'Ob'
              },
              children: []
            },
            {
              data: {
                name: 'Bassoon',
                id: 30,
                shortCode: 'Bs'
              },
              children: []
            },
            {
              data: {
                name: 'Saxophone',
                id: 31,
                shortCode: 'Sx'
              },
              children: []
            }
          ]
        },
        {
          data: {
            name: 'Strings',
            id: 32,
            shortCode: 'Str'
          },
          children: [
            {
              data: {
                name: 'Violin',
                id: 33,
                shortCode: 'Vln'
              },
              children: []
            },
            {
              data: {
                name: 'Viola',
                id: 34,
                shortCode: 'Vla'
              },
              children: []
            },
            {
              data: {
                name: 'Cello',
                id: 35,
                shortCode: 'Vcl'
              },
              children: []
            },
            {
              data: {
                name: 'Double Bass',
                id: 36,
                shortCode: 'Dbl'
              },
              children: []
            },
            {
              data: {
                name: 'Harp',
                id: 37,
                shortCode: 'Ha'
              },
              children: []
            },
            {
              data: {
                name: 'Guitar',
                id: 38,
                shortCode: 'Gtr'
              },
              children: [
                {
                  data: {
                    name: 'Classical Guitar',
                    id: 39,
                    shortCode: 'CGt'
                  },
                  children: []
                },
                {
                  data: {
                    name: 'Electric Guitar',
                    id: 40,
                    shortCode: 'EGt'
                  },
                  children: []
                },
                {
                  data: {
                    name: 'Acoustic Guitar',
                    id: 41,
                    shortCode: 'AGt'
                  },
                  children: []
                }
              ]
            },
            {
              data: {
                name: 'Mandolin',
                id: 42,
                shortCode: 'Mdn'
              },
              children: []
            },
            {
              data: {
                name: 'Ukulele',
                id: 43,
                shortCode: 'Uke'
              },
              children: []
            }
          ]
        },
        {
          data: {
            name: 'Keyboard',
            id: 44,
            shortCode: 'Kbd'
          },
          children: [
            {
              data: {
                name: 'Organ',
                id: 45,
                shortCode: 'Org'
              },
              children: []
            },
            {
              data: {
                name: 'Harpsichord',
                id: 46,
                shortCode: 'Hpc'
              },
              children: []
            },
            {
              data: {
                name: 'Synthesizer',
                id: 47,
                shortCode: 'Syn'
              },
              children: []
            }
          ]
        },
        {
          data: {
            name: 'Electronic Instruments',
            id: 48,
            shortCode: 'EIn'
          },
          children: [
            {
              data: {
                name: 'Electronic Drum Kit',
                id: 49,
                shortCode: 'EDK'
              },
              children: []
            },
            {
              data: {
                name: 'Turntables',
                id: 50,
                shortCode: 'Ttb'
              },
              children: []
            },
            {
              data: {
                name: 'Sampler',
                id: 51,
                shortCode: 'Smp'
              },
              children: []
            },
            {
              data: {
                name: 'Production',
                id: 56,
                shortCode: 'Pro'
              },
              children: []
            }
          ]
        },
        {
          data: {
            name: 'Vocal',
            id: 52,
            shortCode: 'Vox'
          },
          children: [
            {
              data: {
                name: 'Classical Voice',
                id: 53,
                shortCode: 'CVo'
              },
              children: []
            },
            {
              data: {
                name: 'Jazz/Pop Voice',
                id: 54,
                shortCode: 'JPV'
              },
              children: []
            },
            {
              data: {
                name: 'Choral Singing',
                id: 55,
                shortCode: 'Cho'
              },
              children: []
            }
          ]
        }
      ]
    }
  ]
};
