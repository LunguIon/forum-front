import { Component } from '@angular/core';
import { LogoNavComponent } from '../logo-nav/logo-nav.component';

@Component({
  selector: 'app-login-signup-page',
  standalone: true,
  imports: [LogoNavComponent],
  templateUrl: './login-signup-page.component.html',
  styleUrl: './login-signup-page.component.scss'
})
export class LoginSignupPageComponent {

}
