import { Component} from '@angular/core';
import { LogoNavComponent } from '../logo-nav/logo-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login-signup-page',
  standalone: true,
  imports: [LogoNavComponent, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './login-signup-page.component.html',
  styleUrl: './login-signup-page.component.scss'
})

export class LoginSignupPageComponent {

isRotated: boolean = false;
toggleRotate(){
  this.isRotated = !this.isRotated;
}

}

