import { Routes } from '@angular/router';

export const BROWSER_ROUTES: Routes = [
  {
    path: '',
    data: { title: 'Question bank' },
    loadComponent: () => import('./browser.component').then((m) => m.BrowserComponent),
  },
];
