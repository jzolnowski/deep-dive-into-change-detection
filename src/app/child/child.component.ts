import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  NgZone,
  ViewChild,
  signal,
  input, WritableSignal,
} from '@angular/core';
import { Alphabet } from '../Aplhabet';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../counter.component';
import { Color } from '../Color';

@Component({
  standalone: true,
  selector: 'child',
  templateUrl: './child.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CounterComponent]
})
export class ChildComponent {
  depth = input.required<number>();
  color = input.required<string | null>();
  @ViewChild('contentNode') readonly contentNode: ElementRef;
  readonly componentId = Alphabet.getUniqueId();
  intervalId: number | undefined;
  private readonly zone = inject(NgZone);
  private readonly componentIndex = Alphabet.getUniqueIndex();
  private timeoutTime: number;
  signalCount: WritableSignal<number> = signal(0);
  cdCount = 0;

  getDefaultColor(index= 0): string {
    return this.color() ?? Color.getColors()[index];
  }

  triggerChangeDetection(): void {
    this.timeoutTime = this.componentIndex * 200;
    this.zone.runOutsideAngular(() => {
      window.setTimeout(() => {
        if (this.contentNode) {
          this.contentNode.nativeElement.style['transform'] = 'scale(1.1)';
          this.contentNode.nativeElement.style['background-color'] = '#000';
        }
      }, this.timeoutTime);
    });
    this.cdCount++;
    this.reset();
  }

  reset(): void {
    this.zone.runOutsideAngular(() => {
      window.setTimeout(() => {
        if (this.contentNode) {
          this.contentNode.nativeElement.style['transform'] = null;
          this.contentNode.nativeElement.style['background-color'] = this.getDefaultColor();
        }
      }, this.timeoutTime + 1800);
    });
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
