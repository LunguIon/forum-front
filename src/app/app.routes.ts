import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NgModule } from '@angular/core';
import { LoginSignupPageComponent } from './login-signup-page/login-signup-page.component';

export const routes: Routes = [
    // {path: '**', redirectTo: 'welcome'},
    {path: 'welcome', component: WelcomePageComponent},
    {path: 'login', component: LoginSignupPageComponent},
    {path: 'signup', component: LoginSignupPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingMudule {}
