# Work Project Series Schema

A **Work Project Series Schema** represents a *template* for creating a *group of tasks of the same type* (i.e. a
project), that will each be performed _once per [Cycle](#cycle)_. A Work Project Series Schema is thus a plan to perform
a certain amount of a given [Work Task Type](#work-task-type) across the duration of a [Cycle](#cycle), both the size and
shape of this amount being defined by the [Delivery Allocation](#delivery-allocation).

# Delivery Allocation

# Work Task Type

A **Work Task Type** has two sets of attributes:

1. Classification
    1. [Work Task Type Name](#work-task-type-name)
    2. [Knowledge Domain](#knowledge-domain)
    3. [Knowledge Level](#knowledge-level)
2. Resources
    1. [Provider Role Type](#provider-role-type)
    2. [Asset Role Type](#asset-role-type)

The **classifications** are used to give a Work Task Type its identity: no two Work Task Types can share the same set of
all three classification attributes. The **resources** are used to define what human or other physical resources are
needed when carrying out the task.

# Work Task Type Name

A **Work Task Type Name** is best conceived as a verb that can be applied to a range of scenarios. For example
*planning*,
*teaching*,
*delivering*, *assembling*, *assessing*, *advising* could be used as Work Task Type Names. They do not give information
about the *"what"* aspect of the object. These aspects are defined by the [Knowledge Domain](#knowledge-domain)
and [Knowledge Level](#knowledge-level).

# Knowledge Domain

A **Knowledge Domain** is difficult to define without resorting to tautology! As labels, knowledge domains are used to
compartmentalize expertise or understanding, to help us form expectations about context and relevancy. In a professional
setting, knowledge domains also guide expectations of competency. "Maths", "English Literature", and "International
Politics" would very likely not elicit the same expectations of context or relevancy from most people or situations.
Knowledge Domains can be arranged as a hierarchy of specifity, e.g. "Isaac Asimov" is a more specific Knowledge Domain
than "science fiction author". Specificity should be considered separately however from expertise or difficulty, as an
attribute of [Work Task Type](#work-task-type) - for that a [Knowledge Level](#knowledge-level) is appropriate.

# Knowledge Level

A **Knowledge Level** is used to denote depth of understanding or expertise, within a
given [Knowledge Domain](#knowledge-domain). To the extent that grades or levels often imply a structured progression,
Knowledge Levels are grouped together into [Knowledge Level Series](#knowledge-level-series). This is particularly
useful in that different [Knowledge Domains](#knowledge-domain) may apply a specialized nomenclature for what is
essentially an ordinal of related (and likely dependent) contexts. For example, music examinations have Grades 1-8,
while martial arts often arrange levels into belt colours.

# Knowledge Level Series

A **Knowledge Level Series** collects together a set of [Knowledge Levels](#knowledge-level) into a strict ordinal
sequence.

# Asset Role Type

An **Asset Role Type** describes the function a physical asset can fulfill, as distinct from its physical form. A "
transport for up to 9 people" would be an Asset Role Type, while a specific vehicle model would be
an [Asset Type](#asset-type). Similarly, "room", "floor", "building", would be Asset Types, while "lecture theatre", "
classroom", or "laboratory" would denote Asset Role Type.

# Provider Role Type

A **Provider Role Type** is the label applied to the person or organization whom we expect engage in performing a
given [Work Task Type](#work-task-type). For example "teaching" is performed by a "teacher". "Lesson planning" may
require a "teacher", or it may require a specialist "lesson planner" Provider Role Type. This is dependent on the local
deployment and business rules applied.

# Work Schema Node

A **Work Schema Node** represents one of three things:

1. The root of a collection of Work Schema Nodes, that can be assigned to any number of [Organizations](#organization)
   in order to schedule that work.
2. Rules defining whether attached nodes are to be scheduled simultaneously, or strictly non-concurrently.
3. The inclusion of a specific [Work Project Series Schema](#work-project-series-schema) within a particular tree of
   Work Schema Nodes.

Thus, a tree of Work Schema Nodes allows the building of complex relationships between tasks that are competing for a
shared pool of [Cycle Subspans](#cycle-subspan), across a [Cycle](#cycle), and tasks that must coordinate
their [Provider Role](#provider-role) and [Asset Role](#asset-role) requirements in order to
allocate [Cycle Subspans](#cycle-subspan) that can support the combine workload.

Work Schema Nodes can be considered as a leaf-to-root aggregation: various different things are combined to produce a
single encapsulated package.

# Scheduling Input Plan

The top-level input for automated schedule building is the set of **Work Schema Node Assignments**: a list
of [Organizations](#organization) and the [Work Schema Nodes](#work-schema-node) that are assigned to each. Only root
Work Schema Nodes (and the trees they represent) _that have been assigned to an Organization_ result in the generation
of any [Work Project Series](#work-project-series) by the scheduling algorithm. The hierarchical relationships between
the Organizations also is crucial to the output from the scheduling algorithm.

From the input plan, the **scheduling algorithm** builds a lists of all required work allocations, and proceeds to
provide a solution bounded by the resource constraints of [suitability](#suitability) and [availability](#availability)

# Organization

An **Organization** is a catch-all for one or more persons, to whom work can be assigned for scheduling. An Organization
can only be directly assigned a single [Work Schema Node](#work-schema-node). In order to assign complex work loads to
an Organization, Work Schema Nodes must be combined into trees.

Organizations are arranged into hierarchies. Organizations can have multiple ancestors and descendants, but cannot form
cycles. An Organization will inherit from its ancestors all the [Work Schema Nodes](#work-schema-node) that are
part of the [Scheduling Input Plan](#scheduling-input-plan). In contrast to Work Schema Nodes, Organizations should be
regarded as root-to-leaf aggregations: from one or more sources different pathways are split and merged to produce
related but distinct results.

# Asset Role

An **Asset Role** is the registration of an [Asset](#asset) as being [available](#availability) for use as a
particular [Asset Role Type](#asset-role-type), for some or all of a [Cycle](#cycle). An Asset could be available in
multiple roles, but these may not overlap in their availability. In order for an Asset to be considered for
a [Work Task Type](#work-task-type) during scheduling, it must also be recorded with
appropriate [Suitabilities](#suitability).

# Provider Role

A **Provider Role** is the registration of a [Party](#party) as being available for performing a
particular [Provider Role Type](#provider-role-type), for some or all of a [Cycle](#cycle). A Party could be available
in multiple roles, but these may not overlap in their availability. In order for a Party to be considered for
a [Work Task Type](#work-task-type) during scheduling, it must also be recording with
appropriate [Suitabilities](#suitability).

# Cycle

A **Cycle** is a top-level container that specifies:

1. How frequently the activities of [Schedule](#schedule) will repeat
2. What units of time within that window is available for work: [Cycle Subspans](#cycle-subspan).
3. How those units can be grouped for blocks of allocation: [Cycle Subspan Groups](#cycle-subspan-group)

Thus, a Cycle designates a length in weeks, and a start day, which provide a reference for its related units.

# Cycle Subspan

A **Cycle Subspan** designates within a [Cycle](#cycle) a unit of time that has a start and end, and occurs on a
particular day within that cycle.

# Cycle Subspan Group

A **Cycle Subspan Group** is one or more consecutive [Cycle Subspans](#cycle-subspan), to which work can be scheduled.

# Asset Type

An **Asset Type** is a generic descriptor of a physical resource, e.g. room, vehicle, computer.

# Work Schema Node Assignment

See [Scheduling Input Plan](#scheduling-input-plan).

# Work Project Series

A **Work Project Series** belongs to a [Schedule](#schedule) and comprises a set
of [Work Task Series](#work-task-series).

# Work Task Series

A **Work Task Series** designates a recurring [Work Task Type](#work-task-type) that will be performed during the
assigned [Cycle Subspan Group](#cycle-subspan-group) on each repetition of the [Cycle](#cycle).

# Work Task Series Unit

A **Work Task Series Unit** is to a [Work Task Series](#work-task-series) as a [Cycle Subspan](#cycle-subspan) is to
a [Cycle Subspan Group](#cycle-subspan-group). The recording of each unit is necessary to prevent erroneously allocating
a **Cycle Subspan** twice, via two overlapping **Cycle Subspan Groups**.

# Availability

**Availability** applies identically to both [Asset Roles](#asset-role) and [Provider Roles](#provider-role) and can be
recorded as one of four values:

1. Never
2. False
3. Maybe
4. True

The scheduling algorithm will only consider assignments where the availability is "true", but the other values are
useful for recording whether the availability of the resource may be subject to any flexibility or negotiation.

# Suitability

**Suitability** applies identically to both [Asset Roles](#asset-role) and [Provider Roles](#provider-role) and is
recorded as a value from 0 to 1. 0 represents no suitability, 1 total suitability. The pool of resources with sufficient
suitability is used to determine permissible allocation by the [scheduling alogrithm](#scheduling-input-plan).

# Asset

An **Asset** is a specific physical resource, e.g. _laptop #1234_, or _Room 101_.

# Party

A **Party** is one of either a [Person](#person) or an [Organization](#organization).

# Schedule

A **Schedule** is a reference to designate a set of [Work Project Series](#work-project-series) that apply to a given [Cycle](#cycle), and were created
together without violating any of the resource or other constraints, determined by
the [scheduling input plan](#scheduling-input-plan).

# Person

An individual, in the legal sense of an individual person.
