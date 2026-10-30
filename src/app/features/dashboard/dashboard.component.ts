import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { formatWhen } from '../../core/format';
import { formatPercent } from '../../core/scoring/scoring';
import { ExamStore } from '../../core/stores/exam.store';
import { ProgressService } from '../../core/services/progress.service';
import { QuestionService } from '../../core/services/question.service';
import { ThemeService } from '../../core/services/theme.service';
import { ToastService } from '../../core/services/toast.service';
import { summarize } from '../../core/stats/progress-stats';
import { CategoryChartComponent } from '../../shared/category-chart.component';
import { EmptyStateComponent } from '../../shared/empty-state.component';
import { LoadingBlockComponent } from '../../shared/loading-block.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CategoryChartComponent, EmptyStateComponent, LoadingBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private readonly bank = inject(QuestionService);
  private readonly toast = inject(ToastService);
  private readonly examStore = inject(ExamStore);
  protected readonly progress = inject(ProgressService);
  protected readonly theme = inject(ThemeService);
  protected readonly formatPercent = formatPercent;
  protected readonly formatWhen = formatWhen;
  protected readonly loading = computed(() => this.bank.status() === 'loading');
  protected readonly summary = computed(() => summarize(this.bank.questions(), this.progress.state()));
  protected readonly chartLabels = computed(() => this.summary().categories.map((item) => item.category));
  protected readonly chartValues = computed(() => this.summary().categories.map((item) => item.percent));

  protected exportFile(): void {
    const blob = new Blob([this.progress.exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `psm-i-prep-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    this.toast.show('Progress exported.', 'success');
  }

  protected importFile(event: Event): void {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || !input.files?.[0]) return;
    const file = input.files[0];
    void file.text().then((text) => {
      const ok = this.progress.importJson(text);
      this.examStore.resync();
      this.theme.apply(this.progress.theme());
      this.toast.show(ok ? 'Progress imported.' : 'That file is not a valid progress export.', ok ? 'success' : 'error');
      input.value = '';
    });
  }
}
