import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-exeption-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NgIf, NgClass],
  templateUrl: './exeption-page.component.html',
  styleUrl: './exeption-page.component.scss'
})
export class ExeptionPageComponent implements OnDestroy{
  // Constructor and Innit
  // ------------- 
  isLightThemeOn: boolean = this.appComponent.isLightThemeOn;
  constructor(private appComponent: AppComponent){
    this.appComponent.showHeaderAndFooter = false;
  }

  ngOnDestroy(): void {
    this.appComponent.showHeaderAndFooter = true;
  }
}
