import { NgClass } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild, ViewEncapsulation, HostListener, } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgbOffcanvas, NgbOffcanvasOptions, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-header-bootstrap',
  standalone: true,
  imports: [NgClass, CollapseModule],
  templateUrl: './header-bootstrap.component.html',
  styleUrl: './header-bootstrap.component.scss',
  encapsulation: ViewEncapsulation.None,
})

export class HeaderBootstrapComponent {
  isCollapsed: boolean = true;
  
  // Constructor
  // -------------
  // constructor(private offcanvasService: NgbOffcanvas) {}
  constructor() {}

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
      position: 'start'
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

  // 
  // -------------

}


