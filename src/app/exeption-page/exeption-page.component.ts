import { Component, OnDestroy } from '@angular/core';
import { AppComponent } from '../app.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-exeption-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './exeption-page.component.html',
  styleUrl: './exeption-page.component.scss'
})
export class ExeptionPageComponent implements OnDestroy{
  constructor(private appComponent: AppComponent){
    this.appComponent.showHeaderAndFooter = false;
  }

  ngOnDestroy(): void {
    this.appComponent.showHeaderAndFooter = true;
  }
}
