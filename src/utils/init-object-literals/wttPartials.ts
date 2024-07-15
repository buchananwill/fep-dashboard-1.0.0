import {
  createALevelPartials,
  createLowerSchoolPartials,
  createWholeSchoolPartials
} from '@/utils/init-object-literals/createKnowledgeDomainLevelCrossProduct';
const classCiv = createALevelPartials(['Classical Civ']);
const latin = createWholeSchoolPartials(['Latin']);
export const musicLowerSchool = createLowerSchoolPartials(['Music']);
export const musicALevel = createALevelPartials(['Music']);
export const artLowerSchool = createLowerSchoolPartials(['Art']);
export const artALevel = createALevelPartials(['Art']);
export const classicsDepartmentPartials = [...classCiv, ...latin];
export const englishWholeSchoolPartials = createWholeSchoolPartials([
  'English'
]);
export const dramaWholeSchoolPartials = createWholeSchoolPartials(['Drama']);
export const economicsAlevelPartials = createALevelPartials(['Economics']);
export const govAndPolALevelPartials = createALevelPartials(['GP']);
export const peWholeSchoolPartials = createWholeSchoolPartials([
  'PE',
  'PE as an Option',
  'Games'
]);
export const rsWholeSchoolPartials = createWholeSchoolPartials(['RS']);
export const philosophyALevelPartials = createALevelPartials(['Philosophy']);
export const mathsLowerSchoolWttExamples = [
  { name: 'Maths: 7' },
  { name: 'Maths: 8' },
  { name: 'Maths: 9' },
  { name: 'Maths: 10' },
  { name: 'Maths: 11' }
];
export const singleAlevelMaths = [{ name: 'Maths: 12' }, { name: 'Maths: 13' }];
export const mathsFurtherWttExamples = [
  { name: 'Further Maths 1: 12' },
  { name: 'Further Maths 2: 12' },
  { name: 'Further Maths 1: 13' },
  { name: 'Further Maths 2: 13' }
];
