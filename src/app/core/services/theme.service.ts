import { Injectable, inject } from '@angular/core';

import { STORAGE_KEY } from '../constants';
import type { ThemeName } from '../models/progress.model';
import { ProgressService } from './progress.service';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly progress = inject(ProgressService);
  private readonly storage = inject(StorageService);
  readonly theme = this.progress.theme;

  init(): void {
    if (!this.storage.has(STORAGE_KEY) && this.prefersDark()) {
      this.progress.setTheme('dark');
    }
    this.apply(this.progress.theme());
  }

  toggle(): void {
    const next: ThemeName = this.progress.theme() === 'dark' ? 'light' : 'dark';
    this.progress.setTheme(next);
    this.apply(next);
  }

  apply(theme: ThemeName): void {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  private prefersDark(): boolean {
    return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
