import { NgClass } from '@angular/common';
import { Component, inject, Input, TemplateRef, ViewEncapsulation  } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';


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

  isOffcanvasCollapsed: boolean = true;

  private offcanvasService = inject(NgbOffcanvas);

	openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { panelClass: 'details-panel', backdropClass: 'details-panel-backdrop', position: 'start' });
	}
}


