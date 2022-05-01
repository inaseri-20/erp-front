import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { AppLayoutComponent } from './core/layouts/app-layout/app-layout.component';
import { UserGuard } from './core/guards/user.guard';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    component: AuthLayoutComponent
  },
  {
    path: 'admin/dashboard',
    loadChildren: () => import('./modules/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule),
    component: AppLayoutComponent,
    canActivate: [UserGuard, AdminGuard]
  },
  {
    path: 'task',
    loadChildren: () => import('./modules/task/task.module').then(m => m.TaskModule),
    component: AppLayoutComponent,
    canActivate: [UserGuard]
  },
  {
    path: '',
    redirectTo: 'client/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
