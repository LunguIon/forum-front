import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { LogoNavComponent } from '../logo-nav/logo-nav.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { initializeConstellations } from '../utils/constelations';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [LogoNavComponent, RouterOutlet, RouterLink, RouterLinkActive, ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit{
  // Constructor and innit
  // -------------
  constructor() { }
  
  @ViewChild('canvasElement', { static: true }) canvasElement: ElementRef | undefined;
  ngOnInit(): void {
    if (this.canvasElement) {
      let colorPrimary : string = getComputedStyle(document.documentElement).getPropertyValue('--clr-primary');
      let colorPrimaryRGBVals : string = getComputedStyle(document.documentElement).getPropertyValue('--clr-primary-rgb-vals');
      const canvas: HTMLCanvasElement = this.canvasElement.nativeElement;
      initializeConstellations(canvas, colorPrimary, colorPrimary, colorPrimaryRGBVals);
    }
  }

}
