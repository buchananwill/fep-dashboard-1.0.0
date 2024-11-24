import { NavigationType } from './iconDefinitions';
import { ReactElement } from 'react';

export type NavLinkDescriptionsRecord = {
  [Property in NavigationType]: string | ReactElement;
};

export const NavLinkDescriptionsDefault: NavLinkDescriptionsRecord = {
  navigation: 'Overview of the website sections.',
  cycles: 'Creating and editing the timetables used for scheduling.',
  knowledgeDomains:
    'Labels for areas of specialized expertise, e.g. Maths, Science.',
  knowledgeLevelSeries: 'Hierarchical labels to organize depth of expertise.',
  workTaskTypes: (
    <span>
      Defining the tasks that require scheduling. Usually labelled with an
      intersection of a <strong>Knowledge Domain</strong> and{' '}
      <strong>Knowledge Level</strong>
    </span>
  ),
  workProjectSeriesSchemas:
    'Defining how time is devoted to a particular task within a scheduled timetable.',
  users: 'The beneficiaries of the work carried out by the business',
  providers: 'The source of the work carried out by the business',
  assets: 'Physical resources required in order to carry out work.',
  carouselGroups: (
    <span>
      <strong>Work Project Series Schemas</strong> that are delivered as a{' '}
      <strong>Carousel</strong> take place concurrently, and are allocated to
      the schedule simultaneously. They place a more complex set of demands on
      the resource constraints, but allow different <strong>Users</strong> to
      choose their own combinations of interchangeable options. A{' '}
      <strong>Carousel Group</strong> assists in automatically creating
      efficient groups of <strong>Carousels</strong> to deliver a wide variety
      of <strong>Work Project Series Schema</strong> combinations.
    </span>
  ),
  workSchemaNodes:
    'Work Schema Nodes connect together a set of Work Project Series Schemas that are assignable to a single Organization',
  workSchemaNodeAssignments:
    'Organizations can be connected hierarchically to allow a set of WorkSchemaNodes to apply across multiple Organizations in parallel.',
  feasibility:
    'Assess a baseline logistical feasibility of a schedule design, regarding its provider and asset resources, and the proposed timetable shape.',
  autoScheduling: 'Commission an automated schedule build via the cloud.',
  schedules:
    'Completed schedule builds and build metrics or both successful and failed build attempts.'
};
