import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { LogoNavComponent } from '../logo-nav/logo-nav.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';  
import { NgClass, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { initializeConstellations } from '../utils/constelations';


@Component({
  selector: 'app-login-signup-page',
  standalone: true,
  imports: [LogoNavComponent, FormsModule, ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './login-signup-page.component.html',
  styleUrl: './login-signup-page.component.scss',
})

export class LoginSignupPageComponent implements OnInit{
  @ViewChild('canvasElement', { static: true }) canvasElement: ElementRef | undefined;
  isSignup: boolean = false;

  constructor(private route : ActivatedRoute) { }

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

  toggleRotate(){
    this.isSignup = !this.isSignup;
  }

  submitLoginForm(form : NgForm) {
    if (form.valid) {
      alert(form.value.login + "\n" + form.value.password);
    } else {   
      alert("Form is invalid");
    }
  }

  submitSignupForm(form : NgForm){
    if (form.valid) {
      alert(form.value.login + "\n" + form.value.password + "\n" + form.value.email);
    } else {
      alert("Form is invalid");
    }
  }

}

