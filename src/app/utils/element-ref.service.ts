import { Injectable, ElementRef, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElementRefService {
  private elementRef!: ElementRef;
  public elementRefChanged: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

  setElementRef(elementRef: ElementRef) {
    this.elementRef = elementRef;
    this.elementRefChanged.emit(this.elementRef);
  }

  getElementRef(): ElementRef {
    return this.elementRef;
  }
}   