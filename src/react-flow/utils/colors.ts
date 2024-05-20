export const BASE_500 = {
  slate: { h: 213, s: 11, l: 56, a: 1, cssHSLA: "hsla(213, 11%, 56%, 1)" },
  gray: { h: 220, s: 9, l: 46, a: 1, cssHSLA: "hsla(220, 9%, 46%, 1)" },
  zinc: { h: 240, s: 7, l: 46, a: 1, cssHSLA: "hsla(240, 7%, 46%, 1)" },
  neutral: { h: 0, s: 0, l: 45, a: 1, cssHSLA: "hsla(0, 0%, 45%, 1)" },
  stone: { h: 33, s: 9, l: 47, a: 1, cssHSLA: "hsla(33, 9%, 47%, 1)" },
  red: { h: 0, s: 84, l: 60, a: 1, cssHSLA: "hsla(0, 84%, 60%, 1)" },
  orange: { h: 25, s: 95, l: 53, a: 1, cssHSLA: "hsla(25, 95%, 53%, 1)" },
  amber: { h: 38, s: 92, l: 50, a: 1, cssHSLA: "hsla(38, 92%, 50%, 1)" },
  yellow: { h: 45, s: 93, l: 47, a: 1, cssHSLA: "hsla(45, 93%, 47%, 1)" },
  lime: { h: 84, s: 81, l: 44, a: 1, cssHSLA: "hsla(84, 81%, 44%, 1)" },
  green: { h: 142, s: 71, l: 45, a: 1, cssHSLA: "hsla(142, 71%, 45%, 1)" },
  emerald: { h: 160, s: 84, l: 39, a: 1, cssHSLA: "hsla(160, 84%, 39%, 1)" },
  teal: { h: 173, s: 80, l: 40, a: 1, cssHSLA: "hsla(173, 80%, 40%, 1)" },
  cyan: { h: 189, s: 94, l: 43, a: 1, cssHSLA: "hsla(189, 94%, 43%, 1)" },
  sky: { h: 199, s: 89, l: 48, a: 1, cssHSLA: "hsla(199, 89%, 48%, 1)" },
  blue: { h: 217, s: 86, l: 60, a: 1, cssHSLA: "hsla(217, 86%, 60%, 1)" },
  indigo: { h: 239, s: 84, l: 67, a: 1, cssHSLA: "hsla(239, 84%, 67%, 1)" },
  violet: { h: 258, s: 90, l: 66, a: 1, cssHSLA: "hsla(258, 90%, 66%, 1)" },
  purple: { h: 271, s: 91, l: 65, a: 1, cssHSLA: "hsla(271, 91%, 65%, 1)" },
  fuchsia: { h: 330, s: 81, l: 60, a: 1, cssHSLA: "hsla(330, 81%, 60%, 1)" },
  rose: { h: 350, s: 89, l: 60, a: 1, cssHSLA: "hsla(350, 89%, 60%, 1)" },
} as const;

export interface HSLA {
  h: number;
  s: number;
  l: number;
  a: number;
  cssHSLA: string;
}
