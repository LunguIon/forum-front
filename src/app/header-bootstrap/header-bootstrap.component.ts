import { NgClass } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild, ViewEncapsulation, HostListener, ElementRef, Renderer2, AfterViewInit, OnInit, OnDestroy, Input } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgbOffcanvas, NgbOffcanvasOptions, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { ElementRefService } from '../service/element-ref.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-header-bootstrap',
  standalone: true,
  imports: [NgClass, CollapseModule, FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './header-bootstrap.component.html',
  styleUrl: './header-bootstrap.component.scss',
  encapsulation: ViewEncapsulation.None,
})

export class HeaderBootstrapComponent implements OnInit, OnDestroy{
  // Input and other variables 
  // -------------
  @Input() username: string ="user 123";
  currentTopic: string = '';

  // Constructor, innit and destroy
  // -------------

  @ViewChild('addMenu') addMenu!: ElementRef;
  @ViewChild('userMenu') userMenu!: ElementRef;
  private elementRefSubscription!: Subscription;
  constructor(private router: Router, private renderer: Renderer2, private elementRefService: ElementRefService, private appComponent: AppComponent) {
    this.renderer.listen('window', 'click', (event: Event) => {
      if (!this.userMenu.nativeElement.contains(event.target)) {
        this.dropdownOpen = false;
      }
    });

    this.renderer.listen('window', 'click', (event: Event) => {
      if (!this.addMenu.nativeElement.contains(event.target)) {
        this.dropdownAddOpen = false;
      }
    });  

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        this.closeCanvas();
      }
    });
  }

  ngOnInit() {
    this.offcanvasContainer = this.elementRefService.getElementRef();
    this.elementRefSubscription = this.elementRefService.elementRefChanged.subscribe(
      (elementRef) => {
        this.offcanvasContainer = elementRef;
      }
    );

    const minLenghtOfName = 20;
    if(this.sanitizedUsername.length < minLenghtOfName){
      for(let i: number = this.sanitizedUsername.length; i <= minLenghtOfName; i++ ){
        this.sanitizedUsername = this.sanitizedUsername + " &nbsp;";
      }  
    }else{
      this.sanitizedUsername = this.sanitizedUsername + " &nbsp;";
    }
  }

  ngOnDestroy() {
    if (this.elementRefSubscription) {
      this.elementRefSubscription.unsubscribe();
    }
  }

  // Username components
  // -------------
  private sanitizedUsername = this.username;

  getSanitizedUsername(): string {
    return this.sanitizedUsername;
  }


  // Change theme components
  // -------------
  isLightThemeOn: boolean = this.appComponent.isLightThemeOn;

  toggleTheme(){
    this.appComponent.toggleTheme();
    this.isLightThemeOn = this.appComponent.isLightThemeOn;
  }


  // Dropdown-Popup components
  // -------------
  dropdownOpen: boolean = false;
  dropdownAddOpen: boolean = false;

  toggleDropdown(event: Event) {
    // event.preventDefault();
    // event.stopPropagation(); 
    this.dropdownAddOpen = false;
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleAddDropdown(event: Event) {
    // event.preventDefault();
    // event.stopPropagation();
    this.dropdownOpen = false; 
    this.dropdownAddOpen = !this.dropdownAddOpen;
  }


  // Mobile canvas components
  // -------------
  @ViewChild('content', { static: true }) content!: TemplateRef<any>;
  private offcanvasRef!: NgbOffcanvasRef;
  private offcanvasService = inject(NgbOffcanvas);
  private offcanvasContainer!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    let width = 992;
    if (window.innerWidth >= width) {
      if(this.offcanvasRef){
        this.dismissCanvas("Colse resize");
      }
    }
  }

  openCanvas() {
    const options: NgbOffcanvasOptions = {
      panelClass: 'details-panel', 
      backdropClass: 'details-panel-backdrop', 
      position: 'start',
      scroll: true,
      container: this.offcanvasContainer.nativeElement
    };

    this.offcanvasRef = this.offcanvasService.open(this.content, options);
  }

  closeCanvas() {
    if (this.offcanvasRef) {
      this.offcanvasRef.close('Close click');
    }
  }

  dismissCanvas(reason: string) {
    if (this.offcanvasRef) {
      this.offcanvasRef.dismiss(reason);
    }
  }

  // Log out btn
  // -------------
  logoutClick(){
    // Delete the session
    this.router.navigate(['/welcome']);
  }  

}


