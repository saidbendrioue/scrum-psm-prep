import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  input,
  untracked,
  viewChild,
  DestroyRef,
} from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, LinearScale, Tooltip } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

@Component({
  selector: 'app-category-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative" [style.height.px]="height()">
      <canvas #canvas aria-hidden="true"></canvas>
    </div>
    <ul class="sr-only">
      @for (label of labels(); track label; let index = $index) {
        <li>{{ label }}: {{ values()[index] }} percent</li>
      }
    </ul>
  `,
})
export class CategoryChartComponent {
  readonly labels = input.required<readonly string[]>();
  readonly values = input.required<readonly number[]>();
  readonly themeName = input<'light' | 'dark'>('light');
  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private chart: Chart | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.chart?.destroy());
    effect(() => {
      const canvas = this.canvas()?.nativeElement;
      const labels = this.labels();
      const values = this.values();
      this.themeName();
      if (!canvas || labels.length === 0) return;
      untracked(() => this.draw(canvas, labels, values));
    });
  }

  protected height(): number {
    return Math.max(220, this.labels().length * 36 + 24);
  }

  private draw(canvas: HTMLCanvasElement, labels: readonly string[], values: readonly number[]): void {
    const styles = getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue('--color-accent').trim() || '#1d4ed8';
    const ink = styles.getPropertyValue('--color-muted').trim() || '#5e554a';
    const line = styles.getPropertyValue('--color-line').trim() || 'rgba(31,27,22,0.1)';
    // One accent on the strongest category; the rest stay quiet neutrals.
    const max = Math.max(...values, 0);
    const quiet = styles.getPropertyValue('--color-surface-2').trim() || '#efe9df';
    const colors = values.map((value) => (value === max && max > 0 ? accent : quiet));
    this.chart?.destroy();
    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: [...labels],
        datasets: [{ label: 'Accuracy', data: [...values], backgroundColor: colors, borderRadius: 4 }],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { min: 0, max: 100, ticks: { color: ink, callback: (value) => `${value}%` }, grid: { color: line } },
          y: { ticks: { color: ink }, grid: { display: false } },
        },
      },
    });
  }
}
