import { Component } from '@angular/core';
import { LogoNavComponent } from '../logo-nav/logo-nav.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [LogoNavComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {

}
