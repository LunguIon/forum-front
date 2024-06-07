import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NgModule } from '@angular/core';
import { LoginSignupPageComponent } from './login-signup-page/login-signup-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CommentsPageComponent } from './comments-page/comments-page.component';
import { PopularComponent } from './popular/popular.component';
import { ExeptionPageComponent } from './exeption-page/exeption-page.component';

export const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomePageComponent},
  {path: 'login', component: LoginSignupPageComponent, data: {isSignup: false}},
  {path: 'signup', component: LoginSignupPageComponent,  data: {isSignup: true}},
  {path: 'home', component: HomePageComponent},
  {path: 'popular', component: PopularComponent},
  {path: 'createtopic', component: CreateTopicComponent},
  {path: 'createpost', component: CreatePostComponent},
  {path: 'comments', component: CommentsPageComponent},
  
  // keep this at the bottom, if you try to access 
  // smt that isn't stated above it redirects you to the welcome page
  {path: '404', component: ExeptionPageComponent}, 
  {path: '**', redirectTo: 'welcome'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
  })

export class AppRoutingModule {}
