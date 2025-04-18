import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./presentation/components/auth-layout.component'),
        children: [
            {
                path: 'sign-in',
                loadComponent: () => import('./presentation/views/sign-in.view'),
            },
            {
                path: 'sign-up',
                loadComponent: () => import('./presentation/views/sign-up.view'),
            },
            {
                path: '**',
                redirectTo: 'sign-in',
                pathMatch: 'full',
            },
        ],
    },
];
