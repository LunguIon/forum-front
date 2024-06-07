import { Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { LogoNavComponent } from '../logo-nav/logo-nav.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { initializeConstellations } from '../utils/constelations';
import { AppComponent } from '../app.component';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [LogoNavComponent, RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit, OnDestroy{
  // Constructor and innit
  // -------------
  constructor(private appComponent : AppComponent) { 
    this.appComponent.showHeaderAndFooter = false;
  }
  
  @ViewChild('canvasElement', { static: true }) canvasElement: ElementRef | undefined;
  ngOnInit(): void {
    if (this.canvasElement) {
      let colorPrimary : string = getComputedStyle(document.documentElement).getPropertyValue('--clr-primary');
      let colorPrimaryRGBVals : string = getComputedStyle(document.documentElement).getPropertyValue('--clr-primary-rgb-vals');
      const canvas: HTMLCanvasElement = this.canvasElement.nativeElement;
      initializeConstellations(canvas, colorPrimary, colorPrimary, colorPrimaryRGBVals);
    }
  }

  ngOnDestroy(): void {
    this.appComponent.showHeaderAndFooter = true;
  }

  isLightThemeOn: boolean = this.appComponent.isLightThemeOn;

  toggleTheme(){
    this.appComponent.toggleTheme();
    this.isLightThemeOn = this.appComponent.isLightThemeOn;
  }

}
