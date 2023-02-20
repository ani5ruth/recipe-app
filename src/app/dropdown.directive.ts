import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isDropdownOpen: boolean;

  @HostListener('document:click', ['$event']) toggleDropwdown(event: Event) {
    this.isDropdownOpen = this.isClickEventOnDropdown(event) ? !this.isDropdownOpen : false;
  }

  constructor(private elRef: ElementRef) {}

  isClickEventOnDropdown(event: Event) {
    return this.elRef.nativeElement.contains(event.target);
  }

}
