import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-loading-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-3" role="status">
      <span class="sr-only">Loading</span>
      @for (slot of slots(); track slot) {
        <div class="h-14 animate-pulse rounded-2xl bg-surface-2"></div>
      }
    </div>
  `,
})
export class LoadingBlockComponent {
  readonly count = input(3);
  protected readonly slots = computed(() => Array.from({ length: this.count() }, (_, index) => index));
}
