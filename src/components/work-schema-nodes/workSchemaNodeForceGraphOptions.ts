import { ForceGraphPageOptions } from 'react-d3-force-wrapper';
import { defaultForceGraphPageOptions } from '@/components/work-schema-node-assignments/defaultForceGraphPageOptions';

const forceOptions = {
  link: false,
  manyBody: false,
  forceY: false,
  forceX: false,
  collide: true,
  center: false,
  custom: true
};

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
  forceSlidersVisibleInitial: {
    centerStrength: false,
    forceXStrength: false,
    forceYStrength: false,
    linkDistance: false,
    linkStrength: false,
    manyBodyMaxDistance: false,
    manyBodyMinDistance: false,
    manyBodyStrength: false,
    manyBodyTheta: false
  },
  forceAttributesInitial: {
    collideStrength: 0,
    customStrength: 75
  },
  normalizationCoefficients: {
    collideStrength: 0.05,
    customStrength: 0.1
  }
};
