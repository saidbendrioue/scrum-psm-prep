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
    const accent = styles.getPropertyValue('--color-accent').trim() || '#1e3a8a';
    const ink = styles.getPropertyValue('--color-muted').trim() || '#5c564c';
    const line = styles.getPropertyValue('--color-line').trim() || '#e4d8c4';
    this.chart?.destroy();
    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: [...labels],
        datasets: [{ label: 'Accuracy', data: [...values], backgroundColor: accent, borderRadius: 6 }],
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
