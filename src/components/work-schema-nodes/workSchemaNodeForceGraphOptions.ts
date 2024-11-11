import { ForceGraphPageOptions } from 'react-d3-force-wrapper';
import { defaultForceGraphPageOptions } from '@/components/work-schema-node-assignments/defaultForceGraphPageOptions';

export const workSchemaNodeForceGraphOptions: ForceGraphPageOptions = {
  ...defaultForceGraphPageOptions,
  forces: {
    link: false,
    manyBody: false,
    forceY: true,
    forceX: true,
    collide: false,
    center: false,
    radial: false
  },
  forceAttributesInitial: {
    collideStrength: 74,
    linkDistance: 34,
    linkStrength: 175,
    manyBodyStrength: 63,
    manyBodyMinDistance: 1,
    manyBodyMaxDistance: 40,
    forceXStrength: 50,
    forceYStrength: 50
  },
  normalizationCoefficients: {
    manyBodyMaxDistance: 10,
    collideStrength: 0.5
  }
};
