import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth-guard'; // function-based guard
import { Notfound } from './features/auth/notfound/notfound';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // 🔓 Public routes
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'signup',
    loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
  },

  // 🔒 Protected user area
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'files',
        pathMatch: 'full',
      },

      {
        path: 'files',
        loadComponent: () =>
          import('./features/dashboard/my-files/my-files').then((m) => m.MyFiles),
        canActivate: [authGuard],
      },
      {
        path: 'shared',
        loadComponent: () => import('./features/dashboard/shared/shared').then((m) => m.Shared),
        canActivate: [authGuard],
      },
      {
        path: 'starred',
        loadComponent: () => import('./features/dashboard/starred/starred').then((m) => m.Starred),
        canActivate: [authGuard],
      },
      {
        path: 'trash',
        loadComponent: () => import('./features/dashboard/trash/trash').then((m) => m.Trash),
        canActivate: [authGuard],
      },
    ],
  },

  // 🚫 404 fallback
  {
    path: '**',
    component: Notfound,
  },
];
