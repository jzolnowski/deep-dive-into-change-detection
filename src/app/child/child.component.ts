import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  input, WritableSignal, viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../counter.component';
import { getColors, getUniqueId, getUniqueIndex } from '../utils';
import { startAnimations, stopAnimations } from '../animations';

@Component({
  standalone: true,
  selector: 'child',
  templateUrl: './child.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [CommonModule, CounterComponent]
})
export class ChildComponent {
  depth = input.required<number>();
  color = input.required<string | null>();
  readonly contentNode = viewChild.required<ElementRef>('contentNode');
  timeoutTime: number;
  componentId = getUniqueId();
  componentIndex = getUniqueIndex();
  intervalId: number | undefined;
  signalCount: WritableSignal<number> = signal(0);
  cdCount: number = 0;

  getDefaultColor(index= 0): string {
    return this.color() ?? getColors()[index];
  }

  triggerChangeDetection(): void {
    this.timeoutTime = this.componentIndex * 200;
    startAnimations(this.contentNode(), this.timeoutTime);
    this.cdCount++;
    this.reset();
  }

  reset(): void {
    stopAnimations(this.contentNode(), this.timeoutTime, this.getDefaultColor());
  }

  incrementSignalCount(): void {
    this.signalCount.update(value => value + 1);
  }

  startInterval(): void {
    this.intervalId = setInterval(() => {
      this.incrementSignalCount();
    }, 2200);
  }

  stopInterval(): void {
    clearInterval(Number(this.intervalId));
    this.intervalId = undefined;
  }

}
