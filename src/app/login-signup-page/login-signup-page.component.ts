import { Component, OnInit, ViewChild, ElementRef, inject, TemplateRef, ViewEncapsulation, OnDestroy} from '@angular/core';
import { LogoNavComponent } from '../logo-nav/logo-nav.component';
import { AbstractControl, FormsModule, NgForm, ReactiveFormsModule, ValidationErrors } from '@angular/forms';  
import { NgClass, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { initializeConstellations } from '../utils/constelations';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { AppComponent } from '../app.component';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ElementRefService } from '../service/element-ref.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-signup-page',
  standalone: true,
  imports: [LogoNavComponent, FormsModule, ReactiveFormsModule, NgClass, NgIf, HttpClientModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
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
  ],
  encapsulation: ViewEncapsulation.None, 
})

export class LoginSignupPageComponent implements OnInit, OnDestroy{
  // Constructor and innit
  // -------------
  private elementRefSubscription!: Subscription;

  constructor(private route : ActivatedRoute, private appComponenet : AppComponent, private authService : AuthenticationService, private elementRefService: ElementRefService, private fb: FormBuilder) { 
    this.appComponenet.showHeaderAndFooter = false;
  }
  redirectToGoogle(): void{
    window.location.href = 'http://speakapi.lol/oauth/google';
  }

  @ViewChild('canvasElement', { static: true }) canvasElement: ElementRef | undefined;
  ngOnInit(): void {
    this.modalContainer = this.elementRefService.getElementRef();
    this.elementRefSubscription = this.elementRefService.elementRefChanged.subscribe(
      (elementRef) => {
        this.modalContainer = elementRef;
      }
    );

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

  ngOnDestroy(): void {
    if (this.elementRefSubscription) {
      this.elementRefSubscription.unsubscribe();
    }
  }
  
  
  // Form btns animation
  // -------------
  isSubmitBtnClicked: boolean = false;

  get submitBtnState() {
    return this.isSubmitBtnClicked ? 'clicked' : 'unclicked';
  }

  toggleSubmitBtnAnimation(form: NgForm): void {
    if(!(form.valid && this.checkPasswordsMatch(form)))
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

  // Password variables
  // -------------
  isSignupPasswordVisible: boolean = false;
  isSignupConfirmPasswordVisible: boolean = false;
  isLoginPasswordVisible: boolean = false; 

  // Login Unsuccsesfull Modal components
  // -------------
  private modalService = inject(NgbModal);
  private modalRef!: NgbModalRef
  private modalContainer!: ElementRef; 
  @ViewChild('content', { static: true }) content!: TemplateRef<any>;
  openModal() {
		this.modalRef = this.modalService.open(this.content, {centered: true,  container: this.modalContainer.nativeElement});
	}
  closeModalAndReload(){
    this.modalRef.close('Close click');
    this.reloadPage();
  }
  reloadPage() {
    window.location.reload();
  }

  // Form functionality
  // -------------
  checkPasswordsMatch(from : NgForm): boolean {
    const password = from.controls['password']?.value;
    const confirmPassword = from.controls['confirm-password']?.value;
    console.log("password: " + password + " confirnPsswd: " + confirmPassword)
    if (confirmPassword != undefined)
      return password === confirmPassword;
    else
      return true;
  }

  submitLoginForm(form: NgForm) {
    if (form.valid) { 
      this.authService.login(form.value).subscribe({
        next: (response) => {
          // Handle successful login
          // console.log('Login successful');
        },
        error: (error) => {
          // Handle login error
          this.openModal();
          // console.error('Login error');
        }
      });
    }
  }

  submitSignupForm(form: NgForm) {
    if (form.valid && this.checkPasswordsMatch(form)) {
      this.authService.signUp(form.value).subscribe({
        next: (response) => {
          // Handle successful signup
          // console.log('Signup successful');
        },
        error: (error) => {
          // Handle signup error
          this.openModal();
          // console.error('Signup error');
        }
      });
    }
  }


}

