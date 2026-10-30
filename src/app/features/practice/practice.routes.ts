import { Routes } from '@angular/router';

export const PRACTICE_ROUTES: Routes = [
  {
    path: '',
    data: { title: 'Practice' },
    loadComponent: () => import('./practice.component').then((m) => m.PracticeComponent),
  },
];
