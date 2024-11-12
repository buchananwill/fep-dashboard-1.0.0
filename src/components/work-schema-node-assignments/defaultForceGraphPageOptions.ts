import { ForceGraphPageOptions } from 'react-d3-force-wrapper';

export const defaultForceGraphPageOptions: ForceGraphPageOptions = {
  forceSlidersVisibleInitial: {
    manyBodyTheta: false,
    centerStrength: false
  },
  forceAttributesInitial: {
    forceYStrength: 50,
    linkStrength: 50,
    linkDistance: 150,
    collideStrength: 10
  },
  normalizationCoefficients: {
    forceXStrength: 0.1,
    forceYStrength: 0.1
  },
  forces: {
    center: false,
    collide: true,
    forceX: true,
    forceY: true,
    link: true,
    manyBody: true
  }
};
