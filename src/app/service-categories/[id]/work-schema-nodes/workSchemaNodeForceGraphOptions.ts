import { ForceGraphPageOptions } from 'react-d3-force-wrapper';
import { defaultForceGraphPageOptions } from '@/components/work-schema-node-assignments/defaultForceGraphPageOptions';

export const workSchemaNodeForceGraphOptions: ForceGraphPageOptions = {
  ...defaultForceGraphPageOptions,
  forces: {
    link: true,
    manyBody: true,
    forceY: false,
    ...defaultForceGraphPageOptions.forces
  },
  forceAttributesInitial: {
    collideStrength: 10,
    linkDistance: 70,
    linkStrength: 10,
    manyBodyStrength: 134,
    manyBodyMinDistance: 1,
    manyBodyMaxDistance: 40,
    forceXStrength: 160,
    forceXSpacing: 77,
    forceYStrength: 0,
    forceYSpacing: 0
  },
  normalizationCoefficients: {
    forceYSpacing: 1000,
    forceXSpacing: 1000,
    manyBodyMaxDistance: 10,
    collideStrength: 0.5
  }
};
