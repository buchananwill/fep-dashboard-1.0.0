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
    collideStrength: 74,
    linkDistance: 34,
    linkStrength: 175,
    manyBodyStrength: 63,
    manyBodyMinDistance: 1,
    manyBodyMaxDistance: 40,
    forceXStrength: 71,
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
