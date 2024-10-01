export const NavCards: NavCard[] = [
  { path: 'test/thing', displayName: 'Thing!' },
  { path: 'test/other-thing', displayName: 'Other... Thing!' }
];

type NavCard = {
  path: string;
  displayName: string;
};
