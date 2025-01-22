# Future Education Paradigm

## Author's Foreword

Learning is a lifelong passion of mine. Throughout my journey through the "education establishment", it frustrated me
when my inherent thirst for all kinds of knowledge, discovery, and creativity, was apparently thwarted by "the system".
I was also incredibly fortunate to have had some truly inspirational teachers along the way. Working as a teacher myself
for over a decade has been eye-opening. It seems the teachers are often struggling against the system no less than the
children are struggling against the teachers. If some of that struggle can be taken out at one end of the system,
perhaps a little less will end up going in at the other, and we'll all be winners. FEP is an aspiration to radically
reduce at least one kind of struggle.

## Introduction

> The essence of good teaching is the regular meeting of curiosity with encouragement.

Future Education Paradigm (FEP) is born of a single core principle: students want to learn, and teachers want to expend
their work effort on helping students learn.

The most valuable resources available to any type of "school" are thus two things:

- its teachers' time, and how it is distributed,
- its students' curious engagement and how it is nurtured

FEP offers solutions to both these challenges:

- A flexible, powerful and scalable engine for solving multi-dimensional resource allocation problems
- A student-centered approach to delivering synchronized elective learning plans, maximizing the freedom of student
  choice.

## System Overview

> Make the solution as simple as possible, but no simpler.

There are **five core processes** when using FEP. In order from "least frequently used" to "most frequently used", they
are:

1. [Baseline Data Entry](#baseline-data-entry)
2. [Work Plan Creation](#work-plan-creation)
3. [User Requirement Input](#user-requirement-input)
4. [Resource Management](#resource-management)
5. [Schedule Generation](#schedule-generation)

The goal of the first four processes is to build a data model of your institution that answers these questions:

1. How to divide up days into allocatable time units, and how a schedule work cycle repeats (e.g. 6 periods a day,
   repeating fortnightly)?
2. What work is available to be done?
3. What of this work is actually desired by the students?
4. What human and physical resources are available for this work?

The fifth process, [Schedule Generation](#schedule-generation) is the raison d'etre of this data model. Put the kettle
on, get the jigsaw puzzle out, gather the crossword team; your hard work is done. FEP will now match your taxonomical
effort by inexhaustibly searching for a schedule that delivers your work plan, while meeting your resource constraints.
This is the stuff algorithms and silicon excel at, so let them have their day and save your energy for those unique and
necessary human interactions that---intrinsically---can never be automated: the *sine qua non* of good teaching.

### Baseline Data Entry

The baseline data is both divided into categories, and built up in layers. If your institution aligns closely with one
of the initial presets, you may not have to manually enter much at all. Assuming that at least some preset layers match
your data, they can be included and any extensions or deviations applied over the top. This is data that generally will
not change from year to year, and will only need to be entered the very first time when using FEP. It can of course be
added to or edited later if necessary.

#### Time

The time system used by your institution is modelled as a [Cycle](#cycle), comprising [CycleSubspans](#cycle-subspan)
which are joined as blocks into [CycleSubspanGroups](#cycle-subspan-group).

#### Work Definitions

A [Work Type](#work-type) is a composite data model that captures a [Work Type Category](#work-type-category),
a [Knowledge Domain](#knowledge-domain), and a [Knowledge Level](#knowledge-level). It is also used to define what
resources the task requires. If there are some gaps that fail to capture all the types found in your institution, the
closest fitting layer can be augmented, adding WorkTaskCategories, KnowledgeDomains and KnowledgeLevels as required.

WorkTypes are further composed into [Work Schemas](#work-schema) that define other aspects such as the time units
needed, to arrive at a model that may represent a lesson plan, a series of regular assessments, or preparation time
needed in addition to contact time. It is important to recognize that a WorkType may be composed into WorkSchemas of
varying length, without needing to duplicate the data captured by the WorkType.

These definitions are intended to be flexible, so that a FEP operator can choose what should be included in the
schedule. Sometimes it is as important to plan the space, <br>as it is to plan the content.

### Work Plan Creation

A **Work Plan** comprises two complementary sets of graphs (in the connectivity sense, not the Cartesian
sense): [Work Schema Nodes](#work-schema-node) and [Organizations](#organization). WorkSchemaNodes
collect [Work Schemas](#work-schema) into bundles with rules that determine whether those Work Schemas are scheduled to
always overlap (synchronize), or never overlap. Each Organization can be assigned one WorkSchemaNode graph.
Organizations are connected together into hierarchies, with child Organizations inheriting and sharing the schedules of
their parents.

Work Plans can be created from scratch in the graph editor, or generated using the wizard. The Work Plans will often be
reused each year, but can be edited or new ones added at any time. Making changes to one part of the model (Work Schema
Nodes or Organizations), does not necessarily mean the other will need to be updated.

### User Requirement Input

For many scheduling scenarios, some or all of the Work Schemas will be electives, requiring data from the Users (e.g.
students) about which combinations of these need to be scheduled. Creating a [Carousel Group](#carousel-group) will also
result in the creation of a form for these Users to directly select their preferences. If already collected, the data
can also be bulk uploaded. This data is then used to determine the most efficient way to deliver all the selected
combinations, and distribute the students evenly across them. The result can be manually fine-tuned if it doesn't
account for certain edge case constraints. For a highly specific arrangement,
a [Synchronized Work Schema Node](#synchronized-work-schema-node) graph can be built from scratch manually.

This data is generally input once a year, in order to integrate a new cohort beginning their chosen electives, with
those continuing from the previous year.

### Resource Management

Resources are the constraints that will shape the schedule generation. Human and physical resources are modelled in
broadly the same way, and have two key attributes:

- Suitability for one or more of a given Work Type's [Resource Requirements](#resource-requirement-attributes)
- Availability according to the defined [Cycles](#cycle).

This data tends to be the most frequently updated, as most years see the arrival or departure of some staff members, and
sometimes again during the course of the year. Changes to the resource availability may invalidate the current schedule,
requiring it to be replaced with one that minimizes the disruption caused. Don't worry, FEP has got your back when that
happens.

### Schedule Generation

We're here - the exciting part. At your bidding, FEP will take the Work Plan and resource constraints and start building
a schedule that satisfies them both. The schedule building process follows these principles:

1. Unless you tell it to stop, or it exhausts all mathematically possible arrangements of the schedule, FEP will
   continue searching for a solution.
2. While FEP searches, it will periodically send updates about repeated bottlenecks it may be hitting.

It is not difficult to build a Work Plan with a combinatorial large enough to occupy a brute force search until the end
of the universe, even at intensively overclocked CPU speed. To combat this, FEP has many heuristics to avoid repetitious
searching, and can also include stopping conditions that when it becomes sufficiently likely that a solution does not
exist. You may also recognize meta patterns in the updates, and decide to halt the search manually and alter the inputs.
A common example is to simplify the elective combinations available, eliminating some classes.

## Summary

The contents of this user guide can be found embedded through the FEP application itself. The intention is for the
interface to be self-documenting: an explanation of what something is or does can be shown in a tooltip next to that
thing. The text is drawn directly from this document, and references to other concepts will bring you to this page for
further digging.

# FEP Data Models

## Work Schema

A **Work Schema** represents a *template* for creating *a group of tasks of the same type* (i.e. a
project), that will each be performed _once per [Cycle](#cycle)_. A Work Schema is thus a plan to perform
a certain amount of a given [Work Type](#work-type) across the duration of a [Cycle](#cycle), both the size
and
shape of this amount being defined by the [Delivery Allocation](#delivery-allocation).

### Delivery Allocation

A **Delivery Allocation** is part of a [Work Schema](#work-schema) and describes how
many [Cycle Subspan Groups](#cycle-subspan-group) of what size must be allocated during scheduling. If a
given [Cycle](#cycle) does not contain Cycle Subspan Groups of all the size required by the Work Schema,
they are not compatible.

## Work Type

A **Work Type** has two sets of attributes:

1. Classification
    1. [Work Type Category](#work-type-category)
    2. [Knowledge Domain](#knowledge-domain)
    3. [Knowledge Level](#knowledge-level)
2. Resources needs
    1. [Provider Role Type](#provider-role-type)
    2. [Asset Role Type](#asset-role-type)

The **classifications** are used to give a Work Type its identity: no two Work Types can share the same set of
all three classification attributes. The **resource needs** are used to define what human or other physical resources
are
required to carry out the task.

### Classification Attributes

#### Work Type Category

A **Work Type Category** is best conceived as a verb that can be applied to a range of scenarios. For example
*planning*,
*teaching*, *delivering*, *assembling*, *assessing*, *advising* could be used as Work Type Categories. They do not give
information
about the *"what"* aspect of the object. These aspects are defined by the [Knowledge Domain](#knowledge-domain)
and [Knowledge Level](#knowledge-level). The Work Type Category is also used to define how work in that category is
validated as "done".

#### Knowledge Domain

A **Knowledge Domain** is difficult to define without resorting to tautology! As labels, knowledge domains are used to
compartmentalize expertise or understanding, to help us form expectations about context and relevancy. In a professional
setting, knowledge domains also guide expectations of competency. "Maths", "English Literature", and "International
Politics" would very likely not elicit the same expectations of context or relevancy from most people or situations.
Knowledge Domains can be arranged as a hierarchy of specifity, e.g. "Isaac Asimov" is a more specific Knowledge Domain
than "science fiction author". Specificity should be considered separately however from expertise or difficulty, as an
attribute of [Work Type](#work-type) - for that a [Knowledge Level](#knowledge-level) is appropriate.

#### Knowledge Level

A **Knowledge Level** is used to denote depth of understanding or expertise, within a
given [Knowledge Domain](#knowledge-domain). To the extent that grades or levels often imply a structured progression,
Knowledge Levels are grouped together into [Knowledge Level Series](#knowledge-level-series). This is particularly
useful in that different [Knowledge Domains](#knowledge-domain) may apply a specialized nomenclature for what is
essentially an ordinal of related (and likely dependent) contexts. For example, music examinations have Grades 1-8,
while martial arts often arrange levels into belt colours.

#### Knowledge Level Series

A **Knowledge Level Series** collects together a set of [Knowledge Levels](#knowledge-level) into a strict ordinal
sequence.

### Resource Requirement Attributes

#### Asset Role Type

An **Asset Role Type** describes the function a physical asset can fulfill, as distinct from its physical form. A "
transport for up to 9 people" would be an Asset Role Type, while a specific vehicle model would be
an [Asset Type](#asset-type). Similarly, "room", "floor", "building", would be Asset Types, while "lecture theatre", "
classroom", or "laboratory" would denote Asset Role Type.

#### Provider Role Type

A **Provider Role Type** is the label applied to the person or organization whom we expect to engage in performing a
given [Work Type](#work-type). For example "teaching" is performed by a "teacher". "Lesson planning" may
require a "teacher", or it may require a specialist "lesson planner" Provider Role Type. This is dependent on the local
deployment and business rules applied. See also: [Provider Role](#provider-role).

## Work Schema Node

A **Work Schema Node** represents one of three things:

1. The root of a collection of Work Schema Nodes, that can be assigned to any number of [Organizations](#organization)
   in order to schedule that work.
2. Rules defining whether attached nodes are to be scheduled in collective batches without
   overlap, [Synchronized](#synchronized-work-schema-node) or in [Serial](#serial-work-schema-node).
3. The inclusion of a specific [Work Schema](#work-schema) within a particular tree of
   Work Schema Nodes.

Thus, a tree of Work Schema Nodes allows the building of complex relationships between tasks that are competing for a
shared pool of [Cycle Subspans](#cycle-subspan), across a [Cycle](#cycle), and tasks that must coordinate
their [Provider Role](#provider-role) and [Asset Role](#asset-role) requirements in order to
allocate [Cycle Subspans](#cycle-subspan) that can support the combine workload.

Work Schema Nodes can be considered as a leaf-to-root aggregation: various different things are combined to produce a
single encapsulated package.

### Synchronized Work Schema Node

A **Synchronized Work Schema Node** stacks all its descendants to be allocated simultaneously, meaning
a [User Role](#user-role) can only attend one of the descendants' [Work Project Series](#work-project). See
also [Carousel](#carousel).

### Serial Work Schema Node

A **Serial Work Schema Node** maintains the non-concurrency of its descendants, but instead of allowing them to allocate
in batches, it restricts the allocation to one [Cycle Subspan Group](#cycle-subspan-group) at a time, allowing finer
grained control over the priority of resources.

### Carousel Group

A **Carousel Group** is a kind of [Work Schema Node](#work-schema-node), used to automatically generate and
assign [User Roles](#user-role) to the options chosen in their [Carousel Order](#carousel-order). A Carousel Group has a
list of [Work Schema](#work-schema) options, which are then distributed across a defined number
of [Carousels](#carousel) (also Work Schema Nodes) in the manner producing the fewest
total [Carousel Options](#carousel-option) (which are leaf Work Schema Nodes) while meeting every combination found in
the related [Carousel Orders](#carousel-order).

### Carousel

A **Carousel** is a kind of [Synchronized Work Schema Node](#work-schema-node), allowing its
attached [Carousel Options](#carousel-option) to perform a synchronized, parallel allocation.
The [Work Project Series](#work-project) produced by a Carousel will occur simultaneously, meaning
a [User Role](#user-role) can only attend one of them: you can only pick a single horse to ride on a carousel at a time.

### Carousel Option

A **Carousel Option** is a leaf [Work Schema Node](#work-schema-node), packaged onto a [Carousel](#carousel) to enable
the allocation of simultaneous [Work Project Series](#work-project) within a Work Schema Node graph.

## Carousel Order

A **Carousel Order** is the set of [Work Schemas](#work-schema) from a [Carousel Group](#carousel-group) chosen by a
particular [User Role](#user-role). Each [Carousel Order Item](#carousel-order-item) is assigns a preference position to
the chosen [Work Schema](#work-schema), so that the operator of FEP can be aware of which alternatives may be considered
acceptable, if the available resources are not able to provide every combination of Work Schemas chosen across the
Carousel Groups in the [Work Plan](#work-plan-creation).

### Carousel Order Item

See [Carousel Order](#carousel-order).

## Scheduling Input Plan

The top-level input for automated schedule building is the set of **Work Schema Node Assignments**: a list
of [Organizations](#organization) and the [Work Schema Nodes](#work-schema-node) that are assigned to each. Only root
Work Schema Nodes (and the trees they represent) _that have been assigned to an Organization_ result in the generation
of any [Work Project Series](#work-project) by the scheduling algorithm. The hierarchical relationships between
the Organizations also is crucial to the output from the scheduling algorithm.

From the input plan, the **scheduling algorithm** builds a lists of all required work allocations, and proceeds to
provide a solution bounded by the resource constraints of [suitability](#suitability) and [availability](#availability)

#### Work Schema Node Assignment

See [Scheduling Input Plan](#scheduling-input-plan).

## Organization

An **Organization** is a catch-all for one or more persons, to whom work can be assigned for scheduling. An Organization
can only be directly assigned a single [Work Schema Node](#work-schema-node). In order to assign complex work loads to
an Organization, Work Schema Nodes must be combined into trees.

Organizations are arranged into hierarchies. Organizations can have multiple ancestors and descendants, but cannot form
cycles. An Organization will inherit from its ancestors all the [Work Schema Nodes](#work-schema-node) that are
part of the [Scheduling Input Plan](#scheduling-input-plan). In contrast to Work Schema Nodes, Organizations should be
regarded as root-to-leaf aggregations: from one or more sources different pathways are split and merged to produce
related but distinct results.

## Roles

**Roles** are used to model [Parties](#party) that provide work, support, planning, etc., [Assets](#asset) that are
required when performing the
work, or [User Roles](#user-role) who are the parties supported by the work.

#### Availability

**Availability** applies identically to both [Asset Roles](#asset-role) and [Provider Roles](#provider-role) and can be
recorded as one of four values:

1. Never
2. False
3. Maybe
4. True

The scheduling algorithm will only consider assignments where the availability is "true", but the other values are
useful for recording whether the availability of the resource may be subject to any flexibility or negotiation.

#### Suitability

**Suitability** applies identically to both [Asset Roles](#asset-role) and [Provider Roles](#provider-role) and is
recorded as a value from 0 to 1. 0 represents no suitability, 1 total suitability. The pool of resources with sufficient
suitability is used to determine permissible allocation by the [scheduling alogrithm](#scheduling-input-plan).

### Asset Role

An **Asset Role** is the registration of an [Asset](#asset) as being [available](#availability) for use as a
particular [Asset Role Type](#asset-role-type), for some or all of a [Cycle](#cycle). An Asset could be available in
multiple roles, but these may not overlap in their availability. In order for an Asset to be considered for
a [Work Type](#work-type) during scheduling, it must also be recorded with
appropriate [Suitabilities](#suitability).

### Provider Role

A **Provider Role** is the registration of a [Party](#party) as being available for performing a
particular [Provider Role Type](#provider-role-type), for some or all of a [Cycle](#cycle). A Party could be available
in multiple roles, but these may not overlap in their availability. In order for a Party to be considered for
a [Work Type](#work-type) during scheduling, it must also be recorded with
appropriate [Suitabilities](#suitability).

The specific use of "Provider" (as opposed to "Worker" or another related word) was chosen because it can imply "
providing effort", "providing support", or "providing a service". It also is intended to reflect that effort is not a
one-way expenditure; a provider is not unilaterally responsible for the success or failure of their effort. It may
depend on both the work of other Providers, and the [Users](#user-role), who are also likely working in their own way.

### User Role

A **user role** can be assigned to any [Party](#party) that will engage for the work supported by
the [Provider Role](#provider-role) and [Asset Role](#asset-role) resources, and thus influence the content of
the [Scheduling Input Plan](#scheduling-input-plan). A key point of influence is the ability of User Roles to
input [Carousel Orders](#carousel-order), which in turn determine the structure of
the [Work Schema Node](#work-schema-node) graphs.

## Cycle

A **Cycle** is a top-level container that specifies:

1. How frequently the activities of [Schedule](#schedule) will repeat
2. What units of time within that window is available for work: [Cycle Subspans](#cycle-subspan).
3. How those units can be grouped for blocks of allocation: [Cycle Subspan Groups](#cycle-subspan-group)

Thus, a Cycle designates a length in weeks, and a start day, which provide a reference for its related units.

### Cycle Subspan

A **Cycle Subspan** designates within a [Cycle](#cycle) a unit of time that has a start and end, and occurs on a
particular day within that cycle.

### Cycle Subspan Group

A **Cycle Subspan Group** is one or more consecutive [Cycle Subspans](#cycle-subspan), to which work can be scheduled.

## Work Project Series

A **Work Project Series** belongs to a [Schedule](#schedule) and comprises a set
of [Work Task Series](#work-task-series).

### Work Task Series

A **Work Task Series** designates a recurring [Work Type](#work-type) that will be performed during the
assigned [Cycle Subspan Group](#cycle-subspan-group) on each repetition of the [Cycle](#cycle).

#### Work Task Series Unit

A **Work Task Series Unit** is to a [Work Task Series](#work-task-series) as a [Cycle Subspan](#cycle-subspan) is to
a [Cycle Subspan Group](#cycle-subspan-group). The recording of each unit is necessary to prevent erroneously allocating
a **Cycle Subspan** twice, via two overlapping **Cycle Subspan Groups**.

## Asset

An **Asset** is a specific physical resource, e.g. _laptop #1234_, or _Room 101_.

### Asset Type

An **Asset Type** is a generic descriptor of a physical resource, e.g. room, vehicle, computer.

## Party

A **Party** is one of either a [Person](#person) or an [Organization](#organization).

## Person

An individual, in the legal sense of an individual person.

## Schedule

A **Schedule** is a reference to designate a set of [Work Project Series](#work-project) that apply to a
given [Cycle](#cycle), and were created
together without violating any of the resource or other constraints, determined by
the [scheduling input plan](#scheduling-input-plan).