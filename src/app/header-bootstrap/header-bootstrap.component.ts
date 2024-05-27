import { NgClass } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild, ViewEncapsulation, HostListener, ElementRef, Renderer2, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgbOffcanvas, NgbOffcanvasOptions, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { ElementRefService } from '../utils/element-ref.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header-bootstrap',
  standalone: true,
  imports: [NgClass, CollapseModule, FormsModule],
  templateUrl: './header-bootstrap.component.html',
  styleUrl: './header-bootstrap.component.scss',
  encapsulation: ViewEncapsulation.None,
})

export class HeaderBootstrapComponent implements OnInit, OnDestroy{
  // Constructor, innit and destroy
  // -------------
  private elementRefSubscription!: Subscription;
  constructor(private eRef: ElementRef, private renderer: Renderer2, private elementRefService: ElementRefService, private appComponent: AppComponent) {
    this.renderer.listen('window', 'click', (event: Event) => {
      if (!this.eRef.nativeElement.contains(event.target)) {
        this.dropdownOpen = false;
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
  }

  ngOnDestroy() {
    if (this.elementRefSubscription) {
      this.elementRefSubscription.unsubscribe();
    }
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

  toggleDropdown(event: Event) {
    // event.preventDefault();
    // event.stopPropagation(); 
    this.dropdownOpen = !this.dropdownOpen;
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


}


