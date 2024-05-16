import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NgModule } from '@angular/core';
import { LoginSignupPageComponent } from './login-signup-page/login-signup-page.component';

export const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomePageComponent},
  {path: 'login', component: LoginSignupPageComponent, data: {isSignup: false}},
  {path: 'signup', component: LoginSignupPageComponent,  data: {isSignup: true}},
  
  // keep this at the bottom, if you try to access 
  // smt that isn't stated above it redirects you to the welcome page 
  {path: '**', redirectTo: 'welcome'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule {}
