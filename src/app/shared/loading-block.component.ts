import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-loading-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-3" role="status" aria-busy="true">
      <span class="sr-only">Loading</span>
      @for (slot of slots(); track slot) {
        <div class="h-14 rounded-[14px] border border-line bg-surface-2/80"></div>
      }
    </div>
  `,
})
export class LoadingBlockComponent {
  readonly count = input(3);
  protected readonly slots = computed(() => Array.from({ length: this.count() }, (_, index) => index));
}
