import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen:boolean = false;

  constructor(private ElRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') mouseclick(e) {
    this.isOpen = !this.isOpen;
  }
}
