export const data = [
  {
    data: {
      id: 0,
      level: 1,
      content:
        '\nA **Work Project Series Schema** represents a *template* for creating a *group of tasks of the same type* (i.e. a\r\nproject), that will each be performed _once per [Cycle](#cycle)_. A Work Project Series Schema is thus a plan to perform\r\na certain amount of a given [Work Task Type](#work-type) across the duration of a [Cycle](#cycle), both the size\r\nand\r\nshape of this amount being defined by the [Delivery Allocation](#delivery-allocation).\r\n\r\n\r',
      blockPosition: 0,
      htmlId: 'work-project-series-schema'
    },
    children: [
      {
        data: {
          id: 1,
          level: 2,
          content:
            '\nA **Delivery Allocation** is part of a [Work Project Series Schema](#work-project-series-schema) and describes how\r\nmany [Cycle Subspan Groups](#cycle-subspan-group) of what size must be allocated during scheduling. If a\r\ngiven [Cycle](#cycle) does not contain Cycle Subspan Groups of all the size required by the Work Project Series Schema,\r\nthey are not compatible.\r\n\r\n\r',
          blockPosition: 1,
          htmlId: 'delivery-allocation'
        },
        children: []
      }
    ]
  },
  {
    data: {
      id: 2,
      level: 1,
      content:
        '\nA **Work Task Type** has two sets of attributes:\r\n\r\n1. Classification\r\n   1. [Work Task Type Name](#work-type-name)\r\n   2. [Knowledge Domain](#knowledge-domain)\r\n   3. [Knowledge Level](#knowledge-level)\r\n2. Resources\r\n   1. [Provider Role Type](#provider-role-type)\r\n   2. [Asset Role Type](#asset-role-type)\r\n\r\nThe **classifications** are used to give a Work Task Type its identity: no two Work Task Types can share the same set of\r\nall three classification attributes. The **resources** are used to define what human or other physical resources are\r\nneeded when carrying out the task.\r\n\r\n\r',
      blockPosition: 2,
      htmlId: 'work-type'
    },
    children: [
      {
        data: {
          id: 3,
          level: 2,
          content: '\n\r',
          blockPosition: 3,
          htmlId: 'classification-attributes'
        },
        children: [
          {
            data: {
              id: 4,
              level: 3,
              content:
                '\nA **Work Task Type Name** is best conceived as a verb that can be applied to a range of scenarios. For example\r\n*planning*,\r\n*teaching*,\r\n*delivering*, *assembling*, *assessing*, *advising* could be used as Work Task Type Names. They do not give information\r\nabout the *"what"* aspect of the object. These aspects are defined by the [Knowledge Domain](#knowledge-domain)\r\nand [Knowledge Level](#knowledge-level).\r\n\r\n\r',
              blockPosition: 4,
              htmlId: 'work-type-name'
            },
            children: []
          },
          {
            data: {
              id: 5,
              level: 3,
              content:
                '\nA **Knowledge Domain** is difficult to define without resorting to tautology! As labels, knowledge domains are used to\r\ncompartmentalize expertise or understanding, to help us form expectations about context and relevancy. In a professional\r\nsetting, knowledge domains also guide expectations of competency. "Maths", "English Literature", and "International\r\nPolitics" would very likely not elicit the same expectations of context or relevancy from most people or situations.\r\nKnowledge Domains can be arranged as a hierarchy of specifity, e.g. "Isaac Asimov" is a more specific Knowledge Domain\r\nthan "science fiction author". Specificity should be considered separately however from expertise or difficulty, as an\r\nattribute of [Work Task Type](#work-type) - for that a [Knowledge Level](#knowledge-level) is appropriate.\r\n\r\n\r',
              blockPosition: 5,
              htmlId: 'knowledge-domain'
            },
            children: []
          },
          {
            data: {
              id: 6,
              level: 3,
              content:
                '\nA **Knowledge Level** is used to denote depth of understanding or expertise, within a\r\ngiven [Knowledge Domain](#knowledge-domain). To the extent that grades or levels often imply a structured progression,\r\nKnowledge Levels are grouped together into [Knowledge Level Series](#knowledge-level-series). This is particularly\r\nuseful in that different [Knowledge Domains](#knowledge-domain) may apply a specialized nomenclature for what is\r\nessentially an ordinal of related (and likely dependent) contexts. For example, music examinations have Grades 1-8,\r\nwhile martial arts often arrange levels into belt colours.\r\n\r\n\r',
              blockPosition: 6,
              htmlId: 'knowledge-level'
            },
            children: []
          },
          {
            data: {
              id: 7,
              level: 3,
              content:
                '\nA **Knowledge Level Series** collects together a set of [Knowledge Levels](#knowledge-level) into a strict ordinal\r\nsequence.\r\n\r\n\r',
              blockPosition: 7,
              htmlId: 'knowledge-level-series'
            },
            children: []
          }
        ]
      },
      {
        data: {
          id: 8,
          level: 2,
          content: '\n\r',
          blockPosition: 8,
          htmlId: 'resource-requirement-attributes'
        },
        children: [
          {
            data: {
              id: 9,
              level: 3,
              content:
                '\nAn **Asset Role Type** describes the function a physical asset can fulfill, as distinct from its physical form. A "\r\ntransport for up to 9 people" would be an Asset Role Type, while a specific vehicle model would be\r\nan [Asset Type](#asset-type). Similarly, "room", "floor", "building", would be Asset Types, while "lecture theatre", "\r\nclassroom", or "laboratory" would denote Asset Role Type.\r\n\r\n\r',
              blockPosition: 9,
              htmlId: 'asset-role-type'
            },
            children: []
          },
          {
            data: {
              id: 10,
              level: 3,
              content:
                '\nA **Provider Role Type** is the label applied to the person or organization whom we expect engage in performing a\r\ngiven [Work Task Type](#work-type). For example "teaching" is performed by a "teacher". "Lesson planning" may\r\nrequire a "teacher", or it may require a specialist "lesson planner" Provider Role Type. This is dependent on the local\r\ndeployment and business rules applied.\r\n\r\n\r',
              blockPosition: 10,
              htmlId: 'provider-role-type'
            },
            children: []
          }
        ]
      }
    ]
  },
  {
    data: {
      id: 11,
      level: 1,
      content:
        '\nA **Work Schema Node** represents one of three things:\r\n\r\n1. The root of a collection of Work Schema Nodes, that can be assigned to any number of [Organizations](#organization)\r\n   in order to schedule that work.\r\n2. Rules defining whether attached nodes are to be scheduled simultaneously, or strictly non-concurrently.\r\n3. The inclusion of a specific [Work Project Series Schema](#work-project-series-schema) within a particular tree of\r\n   Work Schema Nodes.\r\n\r\nThus, a tree of Work Schema Nodes allows the building of complex relationships between tasks that are competing for a\r\nshared pool of [Cycle Subspans](#cycle-subspan), across a [Cycle](#cycle), and tasks that must coordinate\r\ntheir [Provider Role](#provider-role) and [Asset Role](#asset-role) requirements in order to\r\nallocate [Cycle Subspans](#cycle-subspan) that can support the combine workload.\r\n\r\nWork Schema Nodes can be considered as a leaf-to-root aggregation: various different things are combined to produce a\r\nsingle encapsulated package.\r\n\r\n\r',
      blockPosition: 11,
      htmlId: 'work-schema-node'
    },
    children: []
  },
  {
    data: {
      id: 12,
      level: 1,
      content:
        '\nThe top-level input for automated schedule building is the set of **Work Schema Node Assignments**: a list\r\nof [Organizations](#organization) and the [Work Schema Nodes](#work-schema-node) that are assigned to each. Only root\r\nWork Schema Nodes (and the trees they represent) _that have been assigned to an Organization_ result in the generation\r\nof any [Work Project Series](#work-project-series) by the scheduling algorithm. The hierarchical relationships between\r\nthe Organizations also is crucial to the output from the scheduling algorithm.\r\n\r\nFrom the input plan, the **scheduling algorithm** builds a lists of all required work allocations, and proceeds to\r\nprovide a solution bounded by the resource constraints of [suitability](#suitability) and [availability](#availability)\r\n\r\n\r',
      blockPosition: 12,
      htmlId: 'scheduling-input-plan'
    },
    children: [
      {
        data: {
          id: 13,
          level: 3,
          content:
            '\nSee [Scheduling Input Plan](#scheduling-input-plan).\r\n\r\n\r',
          blockPosition: 13,
          htmlId: 'work-schema-node-assignment'
        },
        children: []
      }
    ]
  },
  {
    data: {
      id: 14,
      level: 1,
      content:
        '\nAn **Organization** is a catch-all for one or more persons, to whom work can be assigned for scheduling. An Organization\r\ncan only be directly assigned a single [Work Schema Node](#work-schema-node). In order to assign complex work loads to\r\nan Organization, Work Schema Nodes must be combined into trees.\r\n\r\nOrganizations are arranged into hierarchies. Organizations can have multiple ancestors and descendants, but cannot form\r\ncycles. An Organization will inherit from its ancestors all the [Work Schema Nodes](#work-schema-node) that are\r\npart of the [Scheduling Input Plan](#scheduling-input-plan). In contrast to Work Schema Nodes, Organizations should be\r\nregarded as root-to-leaf aggregations: from one or more sources different pathways are split and merged to produce\r\nrelated but distinct results.\r\n\r\n\r',
      blockPosition: 14,
      htmlId: 'organization'
    },
    children: []
  },
  {
    data: {
      id: 15,
      level: 1,
      content:
        '\n**Roles** are used to model [Parties](#party) that perform work, [Assets](#asset) that are required when performing the\r\nwork, or [users](#user-role) who are the beneficiaries of the work.\r\n\r\n\r',
      blockPosition: 15,
      htmlId: 'roles'
    },
    children: [
      {
        data: {
          id: 16,
          level: 3,
          content:
            '\n**Availability** applies identically to both [Asset Roles](#asset-role) and [Provider Roles](#provider-role) and can be\r\nrecorded as one of four values:\r\n\r\n1. Never\r\n2. False\r\n3. Maybe\r\n4. True\r\n\r\nThe scheduling algorithm will only consider assignments where the availability is "true", but the other values are\r\nuseful for recording whether the availability of the resource may be subject to any flexibility or negotiation.\r\n\r\n\r',
          blockPosition: 16,
          htmlId: 'availability'
        },
        children: []
      },
      {
        data: {
          id: 17,
          level: 3,
          content:
            '\n**Suitability** applies identically to both [Asset Roles](#asset-role) and [Provider Roles](#provider-role) and is\r\nrecorded as a value from 0 to 1. 0 represents no suitability, 1 total suitability. The pool of resources with sufficient\r\nsuitability is used to determine permissible allocation by the [scheduling alogrithm](#scheduling-input-plan).\r\n\r\n\r\n\r',
          blockPosition: 17,
          htmlId: 'suitability'
        },
        children: []
      },
      {
        data: {
          id: 18,
          level: 2,
          content:
            '\nAn **Asset Role** is the registration of an [Asset](#asset) as being [available](#availability) for use as a\r\nparticular [Asset Role Type](#asset-role-type), for some or all of a [Cycle](#cycle). An Asset could be available in\r\nmultiple roles, but these may not overlap in their availability. In order for an Asset to be considered for\r\na [Work Task Type](#work-type) during scheduling, it must also be recorded with\r\nappropriate [Suitabilities](#suitability).\r\n\r\n\r',
          blockPosition: 18,
          htmlId: 'asset-role'
        },
        children: []
      },
      {
        data: {
          id: 19,
          level: 2,
          content:
            '\nA **Provider Role** is the registration of a [Party](#party) as being available for performing a\r\nparticular [Provider Role Type](#provider-role-type), for some or all of a [Cycle](#cycle). A Party could be available\r\nin multiple roles, but these may not overlap in their availability. In order for a Party to be considered for\r\na [Work Task Type](#work-type) during scheduling, it must also be recording with\r\nappropriate [Suitabilities](#suitability).\r\n\r\n\r',
          blockPosition: 19,
          htmlId: 'provider-role'
        },
        children: []
      },
      {
        data: {
          id: 20,
          level: 2,
          content:
            '\nA **user role** can be assigned to any [Party](#party) that will engage for work to be carried out, and thus influence\r\nthe content of the [Scheduling Input Plan](#scheduling-input-plan).\r\n\r\n\r',
          blockPosition: 20,
          htmlId: 'user-role'
        },
        children: []
      }
    ]
  },
  {
    data: {
      id: 21,
      level: 1,
      content:
        '\nA **Cycle** is a top-level container that specifies:\r\n\r\n1. How frequently the activities of [Schedule](#schedule) will repeat\r\n2. What units of time within that window is available for work: [Cycle Subspans](#cycle-subspan).\r\n3. How those units can be grouped for blocks of allocation: [Cycle Subspan Groups](#cycle-subspan-group)\r\n\r\nThus, a Cycle designates a length in weeks, and a start day, which provide a reference for its related units.\r\n\r\n\r',
      blockPosition: 21,
      htmlId: 'cycle'
    },
    children: [
      {
        data: {
          id: 22,
          level: 2,
          content:
            '\nA **Cycle Subspan** designates within a [Cycle](#cycle) a unit of time that has a start and end, and occurs on a\r\nparticular day within that cycle.\r\n\r\n\r',
          blockPosition: 22,
          htmlId: 'cycle-subspan'
        },
        children: []
      },
      {
        data: {
          id: 23,
          level: 2,
          content:
            '\nA **Cycle Subspan Group** is one or more consecutive [Cycle Subspans](#cycle-subspan), to which work can be scheduled.\r\n\r\n\r',
          blockPosition: 23,
          htmlId: 'cycle-subspan-group'
        },
        children: []
      }
    ]
  },
  {
    data: {
      id: 24,
      level: 1,
      content:
        '\nA **Work Project Series** belongs to a [Schedule](#schedule) and comprises a set\r\nof [Work Task Series](#work-task-series).\r\n\r\n\r',
      blockPosition: 24,
      htmlId: 'work-project-series'
    },
    children: [
      {
        data: {
          id: 25,
          level: 2,
          content:
            '\nA **Work Task Series** designates a recurring [Work Task Type](#work-type) that will be performed during the\r\nassigned [Cycle Subspan Group](#cycle-subspan-group) on each repetition of the [Cycle](#cycle).\r\n\r\n\r',
          blockPosition: 25,
          htmlId: 'work-task-series'
        },
        children: [
          {
            data: {
              id: 26,
              level: 3,
              content:
                '\nA **Work Task Series Unit** is to a [Work Task Series](#work-task-series) as a [Cycle Subspan](#cycle-subspan) is to\r\na [Cycle Subspan Group](#cycle-subspan-group). The recording of each unit is necessary to prevent erroneously allocating\r\na **Cycle Subspan** twice, via two overlapping **Cycle Subspan Groups**.\r\n\r\n\r\n\r',
              blockPosition: 26,
              htmlId: 'work-task-series-unit'
            },
            children: []
          }
        ]
      }
    ]
  },
  {
    data: {
      id: 27,
      level: 1,
      content:
        '\nAn **Asset** is a specific physical resource, e.g. _laptop #1234_, or _Room 101_.\r\n\r\n\r',
      blockPosition: 27,
      htmlId: 'asset'
    },
    children: [
      {
        data: {
          id: 28,
          level: 2,
          content:
            '\nAn **Asset Type** is a generic descriptor of a physical resource, e.g. room, vehicle, computer.\r\n\r\n\r\n\r',
          blockPosition: 28,
          htmlId: 'asset-type'
        },
        children: []
      }
    ]
  },
  {
    data: {
      id: 29,
      level: 1,
      content:
        '\nA **Party** is one of either a [Person](#person) or an [Organization](#organization).\r\n\r\n\r',
      blockPosition: 29,
      htmlId: 'party'
    },
    children: []
  },
  {
    data: {
      id: 30,
      level: 1,
      content:
        '\nAn individual, in the legal sense of an individual person.\r\n\r',
      blockPosition: 30,
      htmlId: 'person'
    },
    children: []
  },
  {
    data: {
      id: 31,
      level: 1,
      content:
        '\nA **Schedule** is a reference to designate a set of [Work Project Series](#work-project-series) that apply to a\r\ngiven [Cycle](#cycle), and were created\r\ntogether without violating any of the resource or other constraints, determined by\r\nthe [scheduling input plan](#scheduling-input-plan).',
      blockPosition: 31,
      htmlId: 'schedule'
    },
    children: []
  }
];
