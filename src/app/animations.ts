import { ElementRef } from '@angular/core';

export function startAnimations(viewChild: ElementRef<any>, timeoutTime: number): void {
  setTimeout(() => {
    if (viewChild) {
      viewChild.nativeElement.style['transform'] = 'scale(1.1)';
      viewChild.nativeElement.style['background-color'] = '#000';
    }
  }, timeoutTime);
}

export function stopAnimations(viewChild: ElementRef<any>, timeoutTime: number, defaultColor: string): void {
  setTimeout(() => {
    if (viewChild) {
      viewChild.nativeElement.style['transform'] = null;
      viewChild.nativeElement.style['background-color'] = defaultColor;
    }
  }, timeoutTime + 1800);
}
