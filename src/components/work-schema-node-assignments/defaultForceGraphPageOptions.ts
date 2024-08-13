import { ForceGraphPageOptions } from 'react-d3-force-wrapper';

export const defaultForceGraphPageOptions: ForceGraphPageOptions = {
  forceSlidersVisibleInitial: {
    manyBodyTheta: false,
    forceRadialXRelative: false,
    forceRadialYRelative: false,
    centerStrength: false
  },
  forceAttributesInitial: {
    forceYStrength: 50,
    forceYSpacing: 50,
    linkStrength: 50,
    linkDistance: 150,
    collideStrength: 0
  },
  normalizationCoefficients: {
    forceYSpacing: 1000
  },
  forces: {
    center: false,
    collide: true,
    forceX: false,
    forceY: false,
    link: true,
    manyBody: true,
    radial: false
  }
};
