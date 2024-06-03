import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-toasts-container',
  standalone: true,
  imports: [NgbToastModule, NgTemplateOutlet],
  templateUrl: './toasts-container.component.html',
  styleUrl: './toasts-container.component.scss',
  host: { class: 'toast-container position-fixed bottom-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastsContainerComponent {
  toastService = inject(ToastService);
}
