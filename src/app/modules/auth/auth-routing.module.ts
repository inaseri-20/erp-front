import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'verify/:tell',
    component: VerifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
