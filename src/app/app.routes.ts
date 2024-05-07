import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NgModule } from '@angular/core';
import { LoginSignupPageComponent } from './login-signup-page/login-signup-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const routes: Routes = [
    // {path: '**', redirectTo: 'welcome'},
    {path: 'welcome', component: WelcomePageComponent},
    {path: 'login', component: LoginSignupPageComponent, data: {isSignup: false}},
    {path: 'signup', component: LoginSignupPageComponent,  data: {isSignup: true}}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule {}
