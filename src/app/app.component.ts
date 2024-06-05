import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { HeaderBootstrapComponent } from './header-bootstrap/header-bootstrap.component';
import { ElementRefService } from './service/element-ref.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, HeaderBootstrapComponent, NgIf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnInit {
  // Constructor and innit 
  // -------------
  @ViewChild('headerComponent') headerComponent! : HeaderBootstrapComponent;
  constructor(private elementRefService: ElementRefService){
  }

  ngAfterViewInit() {
    this.elementRefService.setElementRef(this.themeChangeDiv);
  }

  ngOnInit(): void {
      this.loadTheme();
  }

  // Show or Hide Header and Footer - components
  // -------------
  showHeaderAndFooter: boolean = true;


  // Light Mode Components
  // -------------
  @ViewChild ('themeChangeDiv') themeChangeDiv! : ElementRef;
  private readonly themeKey = 'theme';
  private readonly lightThemeClass = 'light-theme';
  private _islightThemeOn: boolean = false;

  loadTheme(): void {
    const theme = localStorage.getItem(this.themeKey);
    if (theme) {
      this._islightThemeOn = true;
    }
  }

  toggleTheme(): void {
    this._islightThemeOn = !this._islightThemeOn;

    if(this._islightThemeOn){
      localStorage.setItem(this.themeKey, this.lightThemeClass);
    }
    else{
      localStorage.removeItem(this.themeKey);
    }
  }

  get isLightThemeOn(): boolean{
    return this._islightThemeOn;
  }

}
