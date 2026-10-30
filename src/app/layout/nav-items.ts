export interface NavItem {
  path: string;
  label: string;
  shortLabel: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', shortLabel: 'Home' },
  { path: '/practice', label: 'Practice', shortLabel: 'Practice' },
  { path: '/exam', label: 'Mock exam', shortLabel: 'Exam' },
  { path: '/review', label: 'Review', shortLabel: 'Review' },
  { path: '/browser', label: 'Question bank', shortLabel: 'Bank' },
];
