import { Component, signal, WritableSignal } from '@angular/core';
import { ChildComponent } from './child/child.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ChildComponent]
})
export class AppComponent {
  depth: WritableSignal<number> = signal(4);
  color: WritableSignal<string | null> = signal(null);

  incrementDepth(): void {
    this.depth.update(depth => depth + 1);
  }

  decrementDepth(): void {
    this.depth.update(depth => depth - 1);
  }

  changeBgColor(color: string | null): void {
    this.color.set(color);
  }

  resetColors(): void {
    this.color.set(null);
  }
}
