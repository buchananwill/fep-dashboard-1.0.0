import { ForceGraphPageOptions } from 'react-d3-force-wrapper';
import { defaultForceGraphPageOptions } from '@/components/work-schema-node-assignments/defaultForceGraphPageOptions';

export const workSchemaNodeForceGraphOptions: ForceGraphPageOptions = {
  ...defaultForceGraphPageOptions,
  forces: {
    link: false,
    manyBody: false,
    forceY: false,
    forceX: false,
    collide: true,
    center: false,
    custom: true
  },
  forceAttributesInitial: {
    collideStrength: 10,
    linkDistance: 34,
    linkStrength: 175,
    manyBodyStrength: 63,
    manyBodyMinDistance: 1,
    manyBodyMaxDistance: 40,
    forceXStrength: 50,
    forceYStrength: 50,
    customStrength: 10
  },
  normalizationCoefficients: {
    manyBodyMaxDistance: 10,
    collideStrength: 0.1,
    customStrength: 0.1,
    forceYStrength: 0.01,
    forceXStrength: 0.01
  }
};
