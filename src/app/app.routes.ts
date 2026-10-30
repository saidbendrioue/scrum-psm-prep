import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },
  {
    path: 'practice',
    loadChildren: () => import('./features/practice/practice.routes').then((m) => m.PRACTICE_ROUTES),
  },
  {
    path: 'exam',
    loadChildren: () => import('./features/exam/exam.routes').then((m) => m.EXAM_ROUTES),
  },
  {
    path: 'review',
    loadChildren: () => import('./features/review/review.routes').then((m) => m.REVIEW_ROUTES),
  },
  {
    path: 'browser',
    loadChildren: () => import('./features/browser/browser.routes').then((m) => m.BROWSER_ROUTES),
  },
  { path: '**', redirectTo: 'dashboard' },
];
