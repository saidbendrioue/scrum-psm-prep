import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ShellService } from './layout/shell.service';
import { SideNavComponent } from './layout/side-nav.component';
import { TopbarComponent } from './layout/topbar.component';
import { ExamStore } from './core/stores/exam.store';
import { ProgressService } from './core/services/progress.service';
import { QuestionService } from './core/services/question.service';
import { ThemeService } from './core/services/theme.service';
import { ToastContainerComponent } from './shared/toast-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNavComponent, TopbarComponent, ToastContainerComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block min-h-dvh' },
})
export class App {
  protected readonly questions = inject(QuestionService);
  protected readonly persistError = inject(ProgressService).persistError;
  protected readonly shell = inject(ShellService);
  private readonly theme = inject(ThemeService);
  private readonly progress = inject(ProgressService);
  private readonly examStore = inject(ExamStore);

  constructor() {
    this.theme.init();
    void this.questions.load();
    if (this.progress.activeExam()) this.examStore.resume();
  }

  protected reload(): void {
    void this.questions.load();
  }
}
