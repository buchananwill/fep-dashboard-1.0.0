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
    linkDistance: 150
  },
  normalizationCoefficients: {
    forceYSpacing: 1000
  },
  forces: { manyBody: true, link: true, center: true, forceY: true }
};
