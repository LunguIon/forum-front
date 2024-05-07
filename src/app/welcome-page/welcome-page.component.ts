import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { LogoNavComponent } from '../logo-nav/logo-nav.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { initializeConstellations } from './constelations';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [LogoNavComponent, RouterOutlet, RouterLink, RouterLinkActive, ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit{
  @ViewChild('canvasElement', { static: true }) canvasElement: ElementRef | undefined;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    if (this.canvasElement) {
      let colorPrimary : string = getComputedStyle(document.documentElement).getPropertyValue('--clr-primary');
      let colorPrimaryRGBVals : string = getComputedStyle(document.documentElement).getPropertyValue('--clr-primary-rgb').substring(4).slice(0,-1);
      console.log(colorPrimaryRGBVals);
      const canvas: HTMLCanvasElement = this.canvasElement.nativeElement;
      initializeConstellations(canvas, colorPrimary, colorPrimary, colorPrimaryRGBVals);
    }
    
  }

}
