export type NavIcon = 'house' | 'practice' | 'exam' | 'review' | 'bank';

export interface NavItem {
  path: string;
  label: string;
  shortLabel: string;
  icon: NavIcon;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', shortLabel: 'Home', icon: 'house' },
  { path: '/practice', label: 'Practice', shortLabel: 'Practice', icon: 'practice' },
  { path: '/exam', label: 'Mock exam', shortLabel: 'Exam', icon: 'exam' },
  { path: '/review', label: 'Review', shortLabel: 'Review', icon: 'review' },
  { path: '/browser', label: 'Question bank', shortLabel: 'Bank', icon: 'bank' },
];
