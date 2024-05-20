import { NgClass } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild, ViewEncapsulation, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgbOffcanvas, NgbOffcanvasOptions, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-header-bootstrap',
  standalone: true,
  imports: [NgClass, CollapseModule, FormsModule],
  templateUrl: './header-bootstrap.component.html',
  styleUrl: './header-bootstrap.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})

export class HeaderBootstrapComponent {
  // Constructor
  // -------------
  constructor(private eRef: ElementRef, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (event: Event) => {
      if (!this.eRef.nativeElement.contains(event.target)) {
        this.dropdownOpen = false;
      }
    });
  }
  // constructor(private offcanvasService: NgbOffcanvas) {}

  // Change theme components
  // -------------
  isLightTheme: boolean = true

  toggleLightTheme(){
    this.isLightTheme = !this.isLightTheme;
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
      scroll: false,
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


