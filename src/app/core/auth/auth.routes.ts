import { Routes } from '@angular/router';
import LayoutComponent from './pages/layout/layout.component';

export const authRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'sign-in',
                loadComponent: () => import('./pages/sign-in/sign-in.component'),
            },
            {
                path: 'sign-up',
                loadComponent: () => import('./pages/sign-up/sign-up.component'),
            },
            {
                path: '**',
                redirectTo: 'sign-in',
                pathMatch: 'full',
            },
        ],
    },
];
