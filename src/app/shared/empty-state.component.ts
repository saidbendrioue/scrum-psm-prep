import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded-[1.5rem] border-[3px] border-dashed border-line bg-surface/80 px-6 py-12 text-center shadow-[var(--shadow-clay-sm)]">
      <h2 class="font-serif text-2xl md:text-3xl">{{ title() }}</h2>
      <p class="mx-auto mt-2 max-w-md text-muted">{{ message() }}</p>
      <div class="mt-5">
        <ng-content />
      </div>
    </div>
  `,
})
export class EmptyStateComponent {
  readonly title = input.required<string>();
  readonly message = input.required<string>();
}
