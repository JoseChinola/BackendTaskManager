import { Routes } from '@angular/router';
import { authGuard } from './shared/auth-guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/layout').then((m) => m.Layout),
        children: [
            { path: '', redirectTo: 'tasks', pathMatch: 'full' },
            {
                path: 'create',
                loadComponent: () => import('./components/task-create/task-create').then(m => m.TaskCreate),
                canActivate: [authGuard]
            },
            {
                path: 'tasks',
                loadComponent: () => import('./components/task-list/task-list').then(m => m.TaskList),
                canActivate: [authGuard]
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./components/task-edit/task-edit').then(m => m.TaskEdit),
                canActivate: [authGuard]
            }
        ]
    },
    {
        path: 'auth',
        loadComponent: () => import('./user/user').then(m => m.User),
        children: [
            {
                path: 'login',
                loadComponent: () => import('./user/login/login').then(m => m.Login)
            },
            {
                path: 'register',
                loadComponent: () => import('./user/registration/registration').then(m => m.Registration)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'tasks'
    }
];
