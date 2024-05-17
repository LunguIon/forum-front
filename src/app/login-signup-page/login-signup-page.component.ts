import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { LogoNavComponent } from '../logo-nav/logo-nav.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';  
import { NgClass, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { initializeConstellations } from '../utils/constelations';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-signup-page',
  standalone: true,
  imports: [LogoNavComponent, FormsModule, ReactiveFormsModule, NgClass, NgIf, HttpClientModule],
  templateUrl: './login-signup-page.component.html',
  styleUrl: './login-signup-page.component.scss',
  animations: [
    trigger('bouceOnClick', [
      state('clicked', style({
        transform: 'rotate(30deg)'
      })),
      state('unclicked', style({
        transform: 'rotate(0deg)'
      })),
      transition('unclicked => clicked', [
        animate('500ms', keyframes([
          style({ transform: 'rotate(0deg)', offset: 0 }),
          style({ transform: 'rotate(7deg)', offset: 0.2 }),
          style({ transform: 'rotate(-7deg)', offset: 0.4 }),
          style({ transform: 'rotate(3deg)', offset: 0.6 }),
          style({ transform: 'rotate(-3deg)', offset: 0.8 }),
          style({ transform: 'rotate(0deg)', offset: 1.0 })
        ]))
      ]),
      transition('clicked => unclicked', [
      ])
    ])
  ] 
})

export class LoginSignupPageComponent implements OnInit{
  // Constructor and innit
  // -------------
  constructor(private route : ActivatedRoute, private authService : AuthenticationService) { }
  redirectToGoogle(): void{
    window.location.href = 'http://localhost:8080/oauth/google';
  }

  
  @ViewChild('canvasElement', { static: true }) canvasElement: ElementRef | undefined;
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.isSignup = data['isSignup'];
    });

    if (this.canvasElement) {
      let colorPrimary : string = getComputedStyle(document.documentElement).getPropertyValue('--clr-primary');
      let colorPrimaryRGBVals : string = getComputedStyle(document.documentElement).getPropertyValue('--clr-primary-rgb-vals');
      const canvas: HTMLCanvasElement = this.canvasElement.nativeElement;
      initializeConstellations(canvas, colorPrimary, colorPrimary, colorPrimaryRGBVals, false);
    }
  }
  
  
  // Form btns animation
  // -------------
  isSubmitBtnClicked: boolean = false;

  get submitBtnState() {
    return this.isSubmitBtnClicked ? 'clicked' : 'unclicked';
  }

  toggleSubmitBtnAnimation(form: NgForm): void {
    if(form.invalid)
      this.isSubmitBtnClicked = !this.isSubmitBtnClicked;
  }

  onSubmitBtnAnimationDone(): void {
    this.isSubmitBtnClicked = false;
  }

  // Card rotate animation
  // -------------
  isSignup: boolean = false;

  toggleCardRotate(){
    this.isSignup = !this.isSignup;
  }




  // Form functionality (you can deletethe comments below)
  // -------------
  submitLoginForm(form: NgForm) {
    if (form.valid) { 
      this.authService.login(form.value).subscribe({
        next: (response) => {
          // Handle successful login
          console.log('Login successful');
        },
        error: (error) => {
          // Handle login error
          console.error('Login error');
        }
      });
    }
  }

  submitSignupForm(form: NgForm) {
    if (form.valid) {
      this.authService.signUp(form.value).subscribe({
        next: (response) => {
          // Handle successful signup
          console.log('Signup successful');
        },
        error: (error) => {
          // Handle signup error
          console.error('Signup error');
        }
      });
    }
  }

}

