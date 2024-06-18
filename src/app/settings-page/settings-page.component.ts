import { ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ElementRefService } from '../service/element-ref.service';
import { from, Subscription } from 'rxjs';
import { NgClass, NgIf } from '@angular/common';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';
import { UserDTO } from '../models/UserDTO.model';
import { AppComponent } from '../app.component';
import { ToastsContainerComponent } from '../toasts-container/toasts-container.component';
import { ToastService } from '../service/toast.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass, ToastsContainerComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
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
export class SettingsPageComponent implements OnInit, OnDestroy{
  user: UserDTO = {username:'', email:'', imageUrl:''}

  private elementRefSubscription!: Subscription;
  constructor(private elementRefService: ElementRefService, private router: Router, private appComponent: AppComponent, private userService: UserService){}

  ngOnInit(): void {
    this.modalContainer = this.elementRefService.getElementRef();
    this.elementRefSubscription = this.elementRefService.elementRefChanged.subscribe(
      (elementRef) => {
        this.modalContainer = elementRef;
      }
    );

    this.appComponent.headerComponent.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    if (this.elementRefSubscription) {
      this.elementRefSubscription.unsubscribe();
    }
  }

  // Modal components
  // -------------
  private modalService = inject(NgbModal);
  private modalContainer!: ElementRef; 
  
  // Username modal
  @ViewChild('usernameModal', { static: true }) usernameModal!: TemplateRef<any>;
  private usernameModalRef!: NgbModalRef
  openUsernameModal() {
    const modalOptions: NgbModalOptions = {
      centered: true,  
      container: this.modalContainer.nativeElement,
      scrollable: true
    }
    this.usernameModalRef = this.modalService.open(this.usernameModal, modalOptions);
	}
  closeUsernameModal(){
    if(this.usernameModalRef){
      this.usernameModalRef.close('Close dismmised');
    }
  }

   // Email modal
   @ViewChild('emailModal', { static: true }) emailModal!: TemplateRef<any>;
   private emailModalRef!: NgbModalRef
   openEmailModal() {
     const modalOptions: NgbModalOptions = {
       centered: true,  
       container: this.modalContainer.nativeElement,
       scrollable: true
     }
     this.emailModalRef = this.modalService.open(this.emailModal, modalOptions);
   }
   closeEmailModal(){
     if(this.emailModalRef){
       this.emailModalRef.close('Close dismmised');
     }
   }

  // Passwd modal
  @ViewChild('passwordModal', { static: true }) passwordModal!: TemplateRef<any>;
  private passwdModalRef!: NgbModalRef
  openPasswordModal() {
    const modalOptions: NgbModalOptions = {
      centered: true,  
      container: this.modalContainer.nativeElement,
      scrollable: true
    }
    this.passwdModalRef = this.modalService.open(this.passwordModal, modalOptions);
	}
  closePasswordModal(){
    if(this.passwdModalRef){
      this.passwdModalRef.close('Close dismmised');
    }
  }

  // Passwd modal
  @ViewChild('deleteModal', { static: true }) deleteModal!: TemplateRef<any>;
  private deleteModalRef!: NgbModalRef
  openDeleteModal() {
    const modalOptions: NgbModalOptions = {
      centered: true,  
      container: this.modalContainer.nativeElement,
      scrollable: true
    }
    this.deleteModalRef = this.modalService.open(this.deleteModal, modalOptions);
	}
  closeDeleteModal(){
    if(this.deleteModalRef){
      this.deleteModalRef.close('Close dismmised');
    }
  }

  // Show/Hide Password btns vars
  // -------------
  isSignupPasswordVisible: boolean = false;
  isSignupConfirmPasswordVisible: boolean = false;
  isNewPasswordVisible: boolean = false; 


  // Toast Components 
  // -------------
  @ViewChild('smtWrongToast') smtWrongToast!: TemplateRef<any>;

  toastService = inject(ToastService);
  showToast(template: TemplateRef<any>) {
    this.toastService.show({ template });
	}

  // Form btns animation
  // -------------
  isSubmitBtnClicked: boolean = false;

  get submitBtnState() {
    return this.isSubmitBtnClicked ? 'clicked' : 'unclicked';
  }

  toggleSubmitBtnAnimation(form: NgForm): void {
    if(!form.valid){
      this.isSubmitBtnClicked = !this.isSubmitBtnClicked;
    }
  }

  toggleChangePasswdBtnAnimation(form: NgForm): void {
    if(!(form.valid && this.checkPasswordsMatch(form)))
      this.isSubmitBtnClicked = !this.isSubmitBtnClicked;
  }

  onSubmitBtnAnimationDone(): void {
    this.isSubmitBtnClicked = false;
  }

  checkPasswordsMatch(from : NgForm): boolean {
    const password = from.controls['password']?.value;
    const confirmPassword = from.controls['confirm-password']?.value;
    
    if (confirmPassword != undefined)
      return password === confirmPassword;
    else
      return true;
  }

  // Form functionalities
  // -------------

  @ViewChild('usernameChangedToast') usernameChangedToast!: TemplateRef<any>;
  changeUsername(form: NgForm){
    if (form.valid) {
      const newUsername: string = form.controls['new-username'].value;
      const email: string = localStorage.getItem('email')!; 

      this.userService.updateUserUsername(email, newUsername).subscribe({
        next: (response) => {
          if (response) {
            this.showToast(this.usernameChangedToast);
            this.user.username = newUsername;
            this.appComponent.headerComponent.updateUser(this.user);
            this.closeUsernameModal();
          } else {
            this.showToast(this.smtWrongToast);
            // console.log('Username update failed');
          }
        },
        error: (error) => {
          this.showToast(this.smtWrongToast);
          // console.log('Error updating username:', error);
        }
      });
    }
  }

  @ViewChild('emailChangedToast') emailChangedToast!: TemplateRef<any>;
  changeEmail(form: NgForm){
    if (form.valid) {
      const newEmail: string = form.controls['new-email'].value;
      const email: string = localStorage.getItem('email')!; 

      const user: UserDTO = { email: newEmail, username: this.user.username, imageUrl: ''};
      this.userService.updateUser(email, user).subscribe({
        next: (response) => {
          user.email = newEmail;
          this.user.email = newEmail;
          // localStorage.setItem('email', newEmail);
          this.showToast(this.emailChangedToast);
          this.closeEmailModal();
        },
        error: (error) => {
          this.showToast(this.smtWrongToast);
          // console.log('Error updating email:', error);
        }
      });
    }
  }

  @ViewChild('passwordChangedToast') passwordChangedToast!: TemplateRef<any>;
  changePassword(form: NgForm){
    if (form.valid && this.checkPasswordsMatch(form)) {
      const oldPassword: string = form.controls['old-password'].value;
      const newPassword: string = form.controls['password'].value;
      const email: string = localStorage.getItem('email')!; 

      this.userService.updateUserPassword(email, newPassword).subscribe({
        next: (response) => {
          this.showToast(this.passwordChangedToast);
          this.closePasswordModal();
        },
        error: (error) => {
          this.showToast(this.smtWrongToast);
          // console.log('Error updating password:', error);
        }
      });
    }
  }

  @ViewChild('accountDeletedToast') accountDeletedToast!: TemplateRef<any>;
  deleteAccout(){
    const email: string = localStorage.getItem('email')!; 

    this.userService.deleteUser(email).subscribe({
      next: () => {
        localStorage.removeItem('email');
        this.showToast(this.accountDeletedToast);
        this.closeDeleteModal();
        this.router.navigate(['/welcome']);
      },
      error: (error) => {
        this.showToast(this.smtWrongToast);
        // console.log('Error deleting account:', error);
      }
    });
  }
}
