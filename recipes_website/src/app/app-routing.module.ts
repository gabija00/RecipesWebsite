import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RecipesPageComponent } from './recipes-page/recipes-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
// route guard
import { AuthGuard } from './shared/guard/auth.guard';

/**const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:"recipes-list",
    component:RecipesPageComponent
  },
  {
    path:"login",
    component:LoginPageComponent
  },
  {
    path:"main",
    component:HomeComponent
  },
  {
    path:"register",
    component:RegisterPageComponent
  },
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full' 
  },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },

];*/
const routes: Routes = [
  { path: '',   component: HomeComponent},
  { path: 'home',   component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
