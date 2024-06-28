import { ForceGraphPageOptions } from 'react-d3-force-wrapper';
import { defaultForceGraphPageOptions } from '@/app/service-categories/[id]/[levelOrdinal]/bundle-assignments/defaultForceGraphPageOptions';

export const bandwidthOptions: ForceGraphPageOptions = {
  ...defaultForceGraphPageOptions,
  forces: {
    link: true,
    manyBody: true,
    forceY: true
  },
  forceAttributesInitial: {
    collideStrength: 10,
    linkDistance: 70,
    linkStrength: 25,
    manyBodyStrength: 134,
    manyBodyMinDistance: 1,
    manyBodyMaxDistance: 90,
    forceXStrength: 0,
    forceYStrength: 106,
    forceYSpacing: 87
  },
  normalizationCoefficients: {
    forceYSpacing: 1000,
    manyBodyMaxDistance: 10
  }
};
