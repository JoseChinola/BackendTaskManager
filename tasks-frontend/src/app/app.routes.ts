import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
    },
    {
        path: 'create',
        loadComponent: () => import('./components/task-create/task-create').then(m => m.TaskCreate)
    },
    {
        path: 'tasks',
        loadComponent: () => import('./components/task-list/task-list').then(m => m.TaskList)
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/task-edit/task-edit').then(m => m.TaskEdit)
    }
];