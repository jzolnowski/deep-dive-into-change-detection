import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';

@Component({
  selector: 'counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="cursor-default inline-block rounded-xl py-1 px-2 bg-green-600 text-sm">
    <span class="text-green-100 inline-block mr-2">{{title()}}</span>
    <span class="text-white font-bold">{{count()}}</span>
  </div>
  `,
})
export class CounterComponent {
  readonly title = input.required<string>();
  readonly count = input.required<number>();
}
