export const data = [
  {
    data: {
      id: 52,
      level: 1,
      content: '\n\r',
      blockPosition: 52,
      htmlId: 'future-education-paradigm'
    },
    children: [
      {
        data: {
          id: 53,
          level: 2,
          content:
            '\n\r\nLearning is a lifelong passion of mine. Throughout my journey through the "education establishment", it frustrated me\r\nwhen my inherent thirst for all kinds of knowledge, discovery, and creativity, was apparently thwarted by "the system".\r\nI was also incredibly fortunate to have had some truly inspirational teachers along the way. Working as a teacher myself\r\nfor over a decade has been eye-opening. It seems the teachers are often struggling against the system no less than the\r\nchildren are struggling against the teachers. If some of that struggle can be taken out at one end of the system,\r\nperhaps a little less will end up going in at the other, and we\'ll all be winners. FEP is an aspiration to radically\r\nreduce at least one kind of struggle.\r\n\r',
          blockPosition: 53,
          htmlId: "author's-foreword"
        },
        children: []
      },
      {
        data: {
          id: 54,
          level: 2,
          content:
            '\n\r\n> The essence of good teaching is the regular meeting of curiosity with encouragement.\r\n\r\nFuture Education Paradigm (FEP) is born of a single core principle: students want to learn, and teachers want to expend\r\ntheir work effort on helping students learn.\r\n\r\nThe most valuable resources available to any type of "school" are thus two things:\r\n\r\n- its teachers\' time, and how it is distributed,\r\n- its students\' curious engagement and how it is nurtured\r\n\r\nFEP offers solutions to both these challenges:\r\n\r\n- A flexible, powerful and scalable engine for solving multi-dimensional resource allocation problems\r\n- A student-centered approach to delivering synchronized elective learning plans, maximizing the freedom of student\r\n  choice.\r\n\r',
          blockPosition: 54,
          htmlId: 'introduction'
        },
        children: []
      },
      {
        data: {
          id: 55,
          level: 2,
          content:
            '\n\r\n> Make the solution as simple as possible, but no simpler.\r\n\r\nThere are **five core processes** when using FEP. In order from "least frequently used" to "most frequently used", they\r\nare:\r\n\r\n1. [Baseline Data Entry](#baseline-data-entry)\r\n2. [Work Plan Creation](#work-plan-creation)\r\n3. [User Requirement Input](#user-requirement-input)\r\n4. [Resource Management](#resource-management)\r\n5. [Schedule Generation](#schedule-generation)\r\n\r\nThe goal of the first four processes is to build a data model of your institution that answers these questions:\r\n\r\n1. How to divide up days into allocatable time units, and how a schedule work cycle repeats (e.g. 6 periods a day,\r\n   repeating fortnightly)?\r\n2. What work is available to be done?\r\n3. What of this work is actually desired by the students?\r\n4. What human and physical resources are available for this work?\r\n\r\nThe fifth process, [Schedule Generation](#schedule-generation) is the raison d\'etre of this data model. Put the kettle\r\non, get the jigsaw puzzle out, gather the crossword team; your hard work is done. FEP will now match your taxonomical\r\neffort by inexhaustibly searching for a schedule that delivers your work plan, while meeting your resource constraints.\r\nThis is the stuff algorithms and silicon excel at, so let them have their day and save your energy for those unique and\r\nnecessary human interactions that---intrinsically---can never be automated: the *sine qua non* of good teaching.\r\n\r',
          blockPosition: 55,
          htmlId: 'system-overview'
        },
        children: [
          {
            data: {
              id: 56,
              level: 3,
              content:
                '\n\r\nThe baseline data is both divided into categories, and built up in layers. If your institution aligns closely with one\r\nof the initial presets, you may not have to manually enter much at all. Assuming that at least some preset layers match\r\nyour data, they can be included and any extensions or deviations applied over the top. This is data that generally will\r\nnot change from year to year, and will only need to be entered the very first time when using FEP. It can of course be\r\nadded to or edited later if necessary.\r\n\r',
              blockPosition: 56,
              htmlId: 'baseline-data-entry'
            },
            children: [
              {
                data: {
                  id: 57,
                  level: 4,
                  content:
                    '\n\r\nThe time system used by your institution is modelled as a [Cycle](#cycle), comprising [CycleSubspans](#cycle-subspan)\r\nwhich are joined as blocks into [CycleSubspanGroups](#cycle-subspan-group).\r\n\r',
                  blockPosition: 57,
                  htmlId: 'time'
                },
                children: []
              },
              {
                data: {
                  id: 58,
                  level: 4,
                  content:
                    '\n\r\nA [Work Type](#work-type) is a composite data model that captures a [Work Type Category](#work-type-category),\r\na [Knowledge Domain](#knowledge-domain), and a [Knowledge Level](#knowledge-level). It is also used to define what\r\nresources the task requires. If there are some gaps that fail to capture all the types found in your institution, the\r\nclosest fitting layer can be augmented, adding WorkTaskCategories, KnowledgeDomains and KnowledgeLevels as required.\r\n\r\nWorkTypes are further composed into [Work Schemas](#work-schema) that define other aspects such as the time units\r\nneeded, to arrive at a model that may represent a lesson plan, a series of regular assessments, or preparation time\r\nneeded in addition to contact time. It is important to recognize that a WorkType may be composed into WorkSchemas of\r\nvarying length, without needing to duplicate the data captured by the WorkType.\r\n\r\nThese definitions are intended to be flexible, so that a FEP operator can choose what should be included in the\r\nschedule. Sometimes it is as important to plan the space, <br>as it is to plan the content.\r\n\r',
                  blockPosition: 58,
                  htmlId: 'work-definitions'
                },
                children: []
              }
            ]
          },
          {
            data: {
              id: 59,
              level: 3,
              content:
                '\n\r\nA **Work Plan** comprises two complementary sets of graphs (in the connectivity sense, not the Cartesian\r\nsense): [Work Schema Nodes](#work-schema-node) and [Organizations](#organization). WorkSchemaNodes\r\ncollect [Work Schemas](#work-schema) into bundles with rules that determine whether those Work Schemas are scheduled to\r\nalways overlap (synchronize), or never overlap. Each Organization can be assigned one WorkSchemaNode graph.\r\nOrganizations are connected together into hierarchies, with child Organizations inheriting and sharing the schedules of\r\ntheir parents.\r\n\r\nWork Plans can be created from scratch in the graph editor, or generated using the wizard. The Work Plans will often be\r\nreused each year, but can be edited or new ones added at any time. Making changes to one part of the model (Work Schema\r\nNodes or Organizations), does not necessarily mean the other will need to be updated.\r\n\r',
              blockPosition: 59,
              htmlId: 'work-plan-creation'
            },
            children: []
          },
          {
            data: {
              id: 60,
              level: 3,
              content:
                "\n\r\nFor many scheduling scenarios, some or all of the Work Schemas will be electives, requiring data from the Users (e.g.\r\nstudents) about which combinations of these need to be scheduled. Creating a [Carousel Group](#carousel-group) will also\r\nresult in the creation of a form for these Users to directly select their preferences. If already collected, the data\r\ncan also be bulk uploaded. This data is then used to determine the most efficient way to deliver all the selected\r\ncombinations, and distribute the students evenly across them. The result can be manually fine-tuned if it doesn't\r\naccount for certain edge case constraints. For a highly specific arrangement,\r\na [Synchronized Work Schema Node](#synchronized-work-schema-node) graph can be built from scratch manually.\r\n\r\nThis data is generally input once a year, in order to integrate a new cohort beginning their chosen electives, with\r\nthose continuing from the previous year.\r\n\r",
              blockPosition: 60,
              htmlId: 'user-requirement-input'
            },
            children: []
          },
          {
            data: {
              id: 61,
              level: 3,
              content:
                "\n\r\nResources are the constraints that will shape the schedule generation. Human and physical resources are modelled in\r\nbroadly the same way, and have two key attributes:\r\n\r\n- Suitability for one or more of a given Work Type's [Resource Requirements](#resource-requirement-attributes)\r\n- Availability according to the defined [Cycles](#cycle).\r\n\r\nThis data tends to be the most frequently updated, as most years see the arrival or departure of some staff members, and\r\nsometimes again during the course of the year. Changes to the resource availability may invalidate the current schedule,\r\nrequiring it to be replaced with one that minimizes the disruption caused. Don't worry, FEP has got your back when that\r\nhappens.\r\n\r",
              blockPosition: 61,
              htmlId: 'resource-management'
            },
            children: []
          },
          {
            data: {
              id: 62,
              level: 3,
              content:
                "\n\r\nWe're here - the exciting part. At your bidding, FEP will take the Work Plan and resource constraints and start building\r\na schedule that satisfies them both. The schedule building process follows these principles:\r\n\r\n1. Unless you tell it to stop, or it exhausts all mathematically possible arrangements of the schedule, FEP will\r\n   continue searching for a solution.\r\n2. While FEP searches, it will periodically send updates about repeated bottlenecks it may be hitting.\r\n\r\nIt is not difficult to build a Work Plan with a combinatorial large enough to occupy a brute force search until the end\r\nof the universe, even at intensively overclocked CPU speed. To combat this, FEP has many heuristics to avoid repetitious\r\nsearching, and can also include stopping conditions that when it becomes sufficiently likely that a solution does not\r\nexist. You may also recognize meta patterns in the updates, and decide to halt the search manually and alter the inputs.\r\nA common example is to simplify the elective combinations available, eliminating some classes.\r\n\r",
              blockPosition: 62,
              htmlId: 'schedule-generation'
            },
            children: []
          }
        ]
      },
      {
        data: {
          id: 63,
          level: 2,
          content:
            '\n\r\nThe contents of this user guide can be found embedded through the FEP application itself. The intention is for the\r\ninterface to be self-documenting: an explanation of what something is or does can be shown in a tooltip next to that\r\nthing. The text is drawn directly from this document, and references to other concepts will bring you to this page for\r\nfurther digging.\r\n\r',
          blockPosition: 63,
          htmlId: 'summary'
        },
        children: []
      }
    ]
  },
  {
    data: {
      id: 64,
      level: 1,
      content: '\n\r',
      blockPosition: 64,
      htmlId: 'fep-data-models'
    },
    children: [
      {
        data: {
          id: 65,
          level: 2,
          content:
            '\n\r\nA **Work Schema** represents a *template* for creating *a group of tasks of the same type* (i.e. a\r\nproject), that will each be performed _once per [Cycle](#cycle)_. A Work Schema is thus a plan to perform\r\na certain amount of a given [Work Type](#work-type) across the duration of a [Cycle](#cycle), both the size\r\nand\r\nshape of this amount being defined by the [Delivery Allocation](#delivery-allocation).\r\n\r',
          blockPosition: 65,
          htmlId: 'work-schema'
        },
        children: [
          {
            data: {
              id: 66,
              level: 3,
              content:
                '\n\r\nA **Delivery Allocation** is part of a [Work Schema](#work-schema) and describes how\r\nmany [Cycle Subspan Groups](#cycle-subspan-group) of what size must be allocated during scheduling. If a\r\ngiven [Cycle](#cycle) does not contain Cycle Subspan Groups of all the size required by the Work Schema,\r\nthey are not compatible.\r\n\r',
              blockPosition: 66,
              htmlId: 'delivery-allocation'
            },
            children: []
          }
        ]
      },
      {
        data: {
          id: 67,
          level: 2,
          content:
            '\n\r\nA **Work Type** has two sets of attributes:\r\n\r\n1. Classification\r\n    1. [Work Type Category](#work-type-category)\r\n    2. [Knowledge Domain](#knowledge-domain)\r\n    3. [Knowledge Level](#knowledge-level)\r\n2. Resources needs\r\n    1. [Provider Role Type](#provider-role-type)\r\n    2. [Asset Role Type](#asset-role-type)\r\n\r\nThe **classifications** are used to give a Work Type its identity: no two Work Types can share the same set of\r\nall three classification attributes. The **resource needs** are used to define what human or other physical resources\r\nare\r\nrequired to carry out the task.\r\n\r',
          blockPosition: 67,
          htmlId: 'work-type'
        },
        children: [
          {
            data: {
              id: 68,
              level: 3,
              content: '\n\r',
              blockPosition: 68,
              htmlId: 'classification-attributes'
            },
            children: [
              {
                data: {
                  id: 69,
                  level: 4,
                  content:
                    '\n\r\nA **Work Type Category** is best conceived as a verb that can be applied to a range of scenarios. For example\r\n*planning*,\r\n*teaching*, *delivering*, *assembling*, *assessing*, *advising* could be used as Work Type Categories. They do not give\r\ninformation\r\nabout the *"what"* aspect of the object. These aspects are defined by the [Knowledge Domain](#knowledge-domain)\r\nand [Knowledge Level](#knowledge-level). The Work Type Category is also used to define how work in that category is\r\nvalidated as "done".\r\n\r',
                  blockPosition: 69,
                  htmlId: 'work-type-category'
                },
                children: []
              },
              {
                data: {
                  id: 70,
                  level: 4,
                  content:
                    '\n\r\nA **Knowledge Domain** is difficult to define without resorting to tautology! As labels, knowledge domains are used to\r\ncompartmentalize expertise or understanding, to help us form expectations about context and relevancy. In a professional\r\nsetting, knowledge domains also guide expectations of competency. "Maths", "English Literature", and "International\r\nPolitics" would very likely not elicit the same expectations of context or relevancy from most people or situations.\r\nKnowledge Domains can be arranged as a hierarchy of specifity, e.g. "Isaac Asimov" is a more specific Knowledge Domain\r\nthan "science fiction author". Specificity should be considered separately however from expertise or difficulty, as an\r\nattribute of [Work Type](#work-type) - for that a [Knowledge Level](#knowledge-level) is appropriate.\r\n\r',
                  blockPosition: 70,
                  htmlId: 'knowledge-domain'
                },
                children: []
              },
              {
                data: {
                  id: 71,
                  level: 4,
                  content:
                    '\n\r\nA **Knowledge Level** is used to denote depth of understanding or expertise, within a\r\ngiven [Knowledge Domain](#knowledge-domain). To the extent that grades or levels often imply a structured progression,\r\nKnowledge Levels are grouped together into [Knowledge Level Series](#knowledge-level-series). This is particularly\r\nuseful in that different [Knowledge Domains](#knowledge-domain) may apply a specialized nomenclature for what is\r\nessentially an ordinal of related (and likely dependent) contexts. For example, music examinations have Grades 1-8,\r\nwhile martial arts often arrange levels into belt colours.\r\n\r',
                  blockPosition: 71,
                  htmlId: 'knowledge-level'
                },
                children: []
              },
              {
                data: {
                  id: 72,
                  level: 4,
                  content:
                    '\n\r\nA **Knowledge Level Series** collects together a set of [Knowledge Levels](#knowledge-level) into a strict ordinal\r\nsequence.\r\n\r',
                  blockPosition: 72,
                  htmlId: 'knowledge-level-series'
                },
                children: []
              }
            ]
          },
          {
            data: {
              id: 73,
              level: 3,
              content: '\n\r',
              blockPosition: 73,
              htmlId: 'resource-requirement-attributes'
            },
            children: [
              {
                data: {
                  id: 74,
                  level: 4,
                  content:
                    '\n\r\nAn **Asset Role Type** describes the function a physical asset can fulfill, as distinct from its physical form. A "\r\ntransport for up to 9 people" would be an Asset Role Type, while a specific vehicle model would be\r\nan [Asset Type](#asset-type). Similarly, "room", "floor", "building", would be Asset Types, while "lecture theatre", "\r\nclassroom", or "laboratory" would denote Asset Role Type.\r\n\r',
                  blockPosition: 74,
                  htmlId: 'asset-role-type'
                },
                children: []
              },
              {
                data: {
                  id: 75,
                  level: 4,
                  content:
                    '\n\r\nA **Provider Role Type** is the label applied to the person or organization whom we expect to engage in performing a\r\ngiven [Work Type](#work-type). For example "teaching" is performed by a "teacher". "Lesson planning" may\r\nrequire a "teacher", or it may require a specialist "lesson planner" Provider Role Type. This is dependent on the local\r\ndeployment and business rules applied. See also: [Provider Role](#provider-role).\r\n\r',
                  blockPosition: 75,
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
          id: 76,
          level: 2,
          content:
            '\n\r\nA **Work Schema Node** represents one of three things:\r\n\r\n1. The root of a collection of Work Schema Nodes, that can be assigned to any number of [Organizations](#organization)\r\n   in order to schedule that work.\r\n2. Rules defining whether attached nodes are to be scheduled in collective batches without\r\n   overlap, [Synchronized](#synchronized-work-schema-node) or in [Serial](#serial-work-schema-node).\r\n3. The inclusion of a specific [Work Schema](#work-schema) within a particular tree of\r\n   Work Schema Nodes.\r\n\r\nThus, a tree of Work Schema Nodes allows the building of complex relationships between tasks that are competing for a\r\nshared pool of [Cycle Subspans](#cycle-subspan), across a [Cycle](#cycle), and tasks that must coordinate\r\ntheir [Provider Role](#provider-role) and [Asset Role](#asset-role) requirements in order to\r\nallocate [Cycle Subspans](#cycle-subspan) that can support the combine workload.\r\n\r\nWork Schema Nodes can be considered as a leaf-to-root aggregation: various different things are combined to produce a\r\nsingle encapsulated package.\r\n\r',
          blockPosition: 76,
          htmlId: 'work-schema-node'
        },
        children: [
          {
            data: {
              id: 77,
              level: 3,
              content:
                "\n\r\nA **Synchronized Work Schema Node** stacks all its descendants to be allocated simultaneously, meaning\r\na [User Role](#user-role) can only attend one of the descendants' [Work Project Series](#work-project-series). See\r\nalso [Carousel](#carousel).\r\n\r",
              blockPosition: 77,
              htmlId: 'synchronized-work-schema-node'
            },
            children: []
          },
          {
            data: {
              id: 78,
              level: 3,
              content:
                '\n\r\nA **Serial Work Schema Node** maintains the non-concurrency of its descendants, but instead of allowing them to allocate\r\nin batches, it restricts the allocation to one [Cycle Subspan Group](#cycle-subspan-group) at a time, allowing finer\r\ngrained control over the priority of resources.\r\n\r',
              blockPosition: 78,
              htmlId: 'serial-work-schema-node'
            },
            children: []
          },
          {
            data: {
              id: 79,
              level: 3,
              content:
                '\n\r\nA **Carousel Group** is a kind of [Work Schema Node](#work-schema-node), used to automatically generate and\r\nassign [User Roles](#user-role) to the options chosen in their [Carousel Order](#carousel-order). A Carousel Group has a\r\nlist of [Work Schema](#work-schema) options, which are then distributed across a defined number\r\nof [Carousels](#carousel) (also Work Schema Nodes) in the manner producing the fewest\r\ntotal [Carousel Options](#carousel-option) (which are leaf Work Schema Nodes) while meeting every combination found in\r\nthe related [Carousel Orders](#carousel-order).\r\n\r',
              blockPosition: 79,
              htmlId: 'carousel-group'
            },
            children: []
          },
          {
            data: {
              id: 80,
              level: 3,
              content:
                '\n\r\nA **Carousel** is a kind of [Synchronized Work Schema Node](#work-schema-node), allowing its\r\nattached [Carousel Options](#carousel-option) to perform a synchronized, parallel allocation.\r\nThe [Work Project Series](#work-project-series) produced by a Carousel will occur simultaneously, meaning\r\na [User Role](#user-role) can only attend one of them: you can only pick a single horse to ride on a carousel at a time.\r\n\r',
              blockPosition: 80,
              htmlId: 'carousel'
            },
            children: []
          },
          {
            data: {
              id: 81,
              level: 3,
              content:
                '\n\r\nA **Carousel Option* is a leaf [Work Schema Node](#work-schema-node), packaged onto a [Carousel](#carousel) to enable\r\nthe allocation of simultaneous [Work Project Series](#work-project-series) within a Work Schema Node graph.\r\n\r',
              blockPosition: 81,
              htmlId: 'carousel-option'
            },
            children: []
          }
        ]
      },
      {
        data: {
          id: 82,
          level: 2,
          content:
            '\n\r\nA **Carousel Order** is the set of [Work Schemas](#work-schema) from a [Carousel Group](#carousel-group) chosen by a\r\nparticular [User Role](#user-role). Each [Carousel Order Item](#carousel-order-item) is assigns a preference position to\r\nthe chosen [Work Schema](#work-schema), so that the operator of FEP can be aware of which alternatives may be considered\r\nacceptable, if the available resources are not able to provide every combination of Work Schemas chosen across the\r\nCarousel Groups in the [Work Plan](#work-plan-creation).\r\n\r',
          blockPosition: 82,
          htmlId: 'carousel-order'
        },
        children: [
          {
            data: {
              id: 83,
              level: 3,
              content: '\n\r\nSee [Carousel Order](#carousel-order).\r\n\r',
              blockPosition: 83,
              htmlId: 'carousel-order-item'
            },
            children: []
          }
        ]
      },
      {
        data: {
          id: 84,
          level: 2,
          content:
            '\n\r\nThe top-level input for automated schedule building is the set of **Work Schema Node Assignments**: a list\r\nof [Organizations](#organization) and the [Work Schema Nodes](#work-schema-node) that are assigned to each. Only root\r\nWork Schema Nodes (and the trees they represent) _that have been assigned to an Organization_ result in the generation\r\nof any [Work Project Series](#work-project-series) by the scheduling algorithm. The hierarchical relationships between\r\nthe Organizations also is crucial to the output from the scheduling algorithm.\r\n\r\nFrom the input plan, the **scheduling algorithm** builds a lists of all required work allocations, and proceeds to\r\nprovide a solution bounded by the resource constraints of [suitability](#suitability) and [availability](#availability)\r\n\r',
          blockPosition: 84,
          htmlId: 'scheduling-input-plan'
        },
        children: [
          {
            data: {
              id: 85,
              level: 4,
              content:
                '\n\r\nSee [Scheduling Input Plan](#scheduling-input-plan).\r\n\r',
              blockPosition: 85,
              htmlId: 'work-schema-node-assignment'
            },
            children: []
          }
        ]
      },
      {
        data: {
          id: 86,
          level: 2,
          content:
            '\n\r\nAn **Organization** is a catch-all for one or more persons, to whom work can be assigned for scheduling. An Organization\r\ncan only be directly assigned a single [Work Schema Node](#work-schema-node). In order to assign complex work loads to\r\nan Organization, Work Schema Nodes must be combined into trees.\r\n\r\nOrganizations are arranged into hierarchies. Organizations can have multiple ancestors and descendants, but cannot form\r\ncycles. An Organization will inherit from its ancestors all the [Work Schema Nodes](#work-schema-node) that are\r\npart of the [Scheduling Input Plan](#scheduling-input-plan). In contrast to Work Schema Nodes, Organizations should be\r\nregarded as root-to-leaf aggregations: from one or more sources different pathways are split and merged to produce\r\nrelated but distinct results.\r\n\r',
          blockPosition: 86,
          htmlId: 'organization'
        },
        children: []
      },
      {
        data: {
          id: 87,
          level: 2,
          content:
            '\n\r\n**Roles** are used to model [Parties](#party) that provide work, support, planning, etc., [Assets](#asset) that are\r\nrequired when performing the\r\nwork, or [User Roles](#user-role) who are the parties supported by the work.\r\n\r',
          blockPosition: 87,
          htmlId: 'roles'
        },
        children: [
          {
            data: {
              id: 88,
              level: 4,
              content:
                '\n\r\n**Availability** applies identically to both [Asset Roles](#asset-role) and [Provider Roles](#provider-role) and can be\r\nrecorded as one of four values:\r\n\r\n1. Never\r\n2. False\r\n3. Maybe\r\n4. True\r\n\r\nThe scheduling algorithm will only consider assignments where the availability is "true", but the other values are\r\nuseful for recording whether the availability of the resource may be subject to any flexibility or negotiation.\r\n\r',
              blockPosition: 88,
              htmlId: 'availability'
            },
            children: []
          },
          {
            data: {
              id: 89,
              level: 4,
              content:
                '\n\r\n**Suitability** applies identically to both [Asset Roles](#asset-role) and [Provider Roles](#provider-role) and is\r\nrecorded as a value from 0 to 1. 0 represents no suitability, 1 total suitability. The pool of resources with sufficient\r\nsuitability is used to determine permissible allocation by the [scheduling alogrithm](#scheduling-input-plan).\r\n\r',
              blockPosition: 89,
              htmlId: 'suitability'
            },
            children: []
          },
          {
            data: {
              id: 90,
              level: 3,
              content:
                '\n\r\nAn **Asset Role** is the registration of an [Asset](#asset) as being [available](#availability) for use as a\r\nparticular [Asset Role Type](#asset-role-type), for some or all of a [Cycle](#cycle). An Asset could be available in\r\nmultiple roles, but these may not overlap in their availability. In order for an Asset to be considered for\r\na [Work Type](#work-type) during scheduling, it must also be recorded with\r\nappropriate [Suitabilities](#suitability).\r\n\r',
              blockPosition: 90,
              htmlId: 'asset-role'
            },
            children: []
          },
          {
            data: {
              id: 91,
              level: 3,
              content:
                '\n\r\nA **Provider Role** is the registration of a [Party](#party) as being available for performing a\r\nparticular [Provider Role Type](#provider-role-type), for some or all of a [Cycle](#cycle). A Party could be available\r\nin multiple roles, but these may not overlap in their availability. In order for a Party to be considered for\r\na [Work Type](#work-type) during scheduling, it must also be recorded with\r\nappropriate [Suitabilities](#suitability).\r\n\r\nThe specific use of "Provider" (as opposed to "Worker" or another related work) was chosen because it can imply "\r\nproviding effort", "providing support", or "providing a service". It also is intended to reflect that effort is not a\r\none-way expenditure; a provider is not unilaterally responsible for the success or failure of their effort. It may\r\ndepend on both the work of other Providers, and the [Users](#user-role), who are also likely working in their own way.\r\n\r',
              blockPosition: 91,
              htmlId: 'provider-role'
            },
            children: []
          },
          {
            data: {
              id: 92,
              level: 3,
              content:
                '\n\r\nA **user role** can be assigned to any [Party](#party) that will engage for the work supported by\r\nthe [Provider Role](#provider-role) and [Asset Role](#asset-role) resources, and thus influence the content of\r\nthe [Scheduling Input Plan](#scheduling-input-plan). A key point of influence is the ability of User Roles to\r\ninput [Carousel Orders](#carousel-order), which in turn determine the structure of\r\nthe [Work Schema Node](#work-schema-node) graphs.\r\n\r',
              blockPosition: 92,
              htmlId: 'user-role'
            },
            children: []
          }
        ]
      },
      {
        data: {
          id: 93,
          level: 2,
          content:
            '\n\r\nA **Cycle** is a top-level container that specifies:\r\n\r\n1. How frequently the activities of [Schedule](#schedule) will repeat\r\n2. What units of time within that window is available for work: [Cycle Subspans](#cycle-subspan).\r\n3. How those units can be grouped for blocks of allocation: [Cycle Subspan Groups](#cycle-subspan-group)\r\n\r\nThus, a Cycle designates a length in weeks, and a start day, which provide a reference for its related units.\r\n\r',
          blockPosition: 93,
          htmlId: 'cycle'
        },
        children: [
          {
            data: {
              id: 94,
              level: 3,
              content:
                '\n\r\nA **Cycle Subspan** designates within a [Cycle](#cycle) a unit of time that has a start and end, and occurs on a\r\nparticular day within that cycle.\r\n\r',
              blockPosition: 94,
              htmlId: 'cycle-subspan'
            },
            children: []
          },
          {
            data: {
              id: 95,
              level: 3,
              content:
                '\n\r\nA **Cycle Subspan Group** is one or more consecutive [Cycle Subspans](#cycle-subspan), to which work can be scheduled.\r\n\r',
              blockPosition: 95,
              htmlId: 'cycle-subspan-group'
            },
            children: []
          }
        ]
      },
      {
        data: {
          id: 96,
          level: 2,
          content:
            '\n\r\nA **Work Project Series** belongs to a [Schedule](#schedule) and comprises a set\r\nof [Work Task Series](#work-task-series).\r\n\r',
          blockPosition: 96,
          htmlId: 'work-project-series'
        },
        children: [
          {
            data: {
              id: 97,
              level: 3,
              content:
                '\n\r\nA **Work Task Series** designates a recurring [Work Type](#work-type) that will be performed during the\r\nassigned [Cycle Subspan Group](#cycle-subspan-group) on each repetition of the [Cycle](#cycle).\r\n\r',
              blockPosition: 97,
              htmlId: 'work-task-series'
            },
            children: [
              {
                data: {
                  id: 98,
                  level: 4,
                  content:
                    '\n\r\nA **Work Task Series Unit** is to a [Work Task Series](#work-task-series) as a [Cycle Subspan](#cycle-subspan) is to\r\na [Cycle Subspan Group](#cycle-subspan-group). The recording of each unit is necessary to prevent erroneously allocating\r\na **Cycle Subspan** twice, via two overlapping **Cycle Subspan Groups**.\r\n\r',
                  blockPosition: 98,
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
          id: 99,
          level: 2,
          content:
            '\n\r\nAn **Asset** is a specific physical resource, e.g. _laptop #1234_, or _Room 101_.\r\n\r',
          blockPosition: 99,
          htmlId: 'asset'
        },
        children: [
          {
            data: {
              id: 100,
              level: 3,
              content:
                '\n\r\nAn **Asset Type** is a generic descriptor of a physical resource, e.g. room, vehicle, computer.\r\n\r',
              blockPosition: 100,
              htmlId: 'asset-type'
            },
            children: []
          }
        ]
      },
      {
        data: {
          id: 101,
          level: 2,
          content:
            '\n\r\nA **Party** is one of either a [Person](#person) or an [Organization](#organization).\r\n\r',
          blockPosition: 101,
          htmlId: 'party'
        },
        children: []
      },
      {
        data: {
          id: 102,
          level: 2,
          content:
            '\n\r\nAn individual, in the legal sense of an individual person.\r\n\r',
          blockPosition: 102,
          htmlId: 'person'
        },
        children: []
      },
      {
        data: {
          id: 103,
          level: 2,
          content:
            '\n\r\nA **Schedule** is a reference to designate a set of [Work Project Series](#work-project-series) that apply to a\r\ngiven [Cycle](#cycle), and were created\r\ntogether without violating any of the resource or other constraints, determined by\r\nthe [scheduling input plan](#scheduling-input-plan).',
          blockPosition: 103,
          htmlId: 'schedule'
        },
        children: []
      }
    ]
  }
];
