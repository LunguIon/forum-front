import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { HeaderBootstrapComponent } from './header-bootstrap/header-bootstrap.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, HeaderBootstrapComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // title = 'AliedTestingAngularUI';
  showHeaderAndFooter: boolean = true;
}
