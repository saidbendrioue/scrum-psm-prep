import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ToastService } from '../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed bottom-20 right-4 z-40 flex w-[min(100%-2rem,22rem)] flex-col gap-2 md:bottom-6" aria-live="polite">
      @for (toast of toastService.toasts(); track toast.id) {
        <button
          type="button"
          class="rounded-2xl border px-4 py-3 text-left text-sm shadow-sm"
          [class]="toneClass(toast.tone)"
          (click)="toastService.dismiss(toast.id)"
        >
          {{ toast.message }}
        </button>
      }
    </div>
  `,
})
export class ToastContainerComponent {
  protected readonly toastService = inject(ToastService);

  protected toneClass(tone: 'success' | 'error' | 'info'): string {
    if (tone === 'success') return 'border-good bg-good-bg text-good';
    if (tone === 'error') return 'border-bad bg-bad-bg text-bad';
    return 'border-line bg-surface text-ink';
  }
}
