import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { QuestionService } from '../core/services/question.service';
import { NAV_ITEMS } from './nav-items';
import { ShellService } from './shell.service';

@Component({
  selector: 'app-side-nav',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './side-nav.component.html',
})
export class SideNavComponent {
  protected readonly items = NAV_ITEMS;
  protected readonly questions = inject(QuestionService);
  protected readonly shell = inject(ShellService);
}
