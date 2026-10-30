import { Injectable, inject, signal } from '@angular/core';

import { NAV_OPEN_KEY } from '../core/constants';
import { StorageService } from '../core/services/storage.service';

@Injectable({ providedIn: 'root' })
export class ShellService {
  private readonly storage = inject(StorageService);
  private readonly openState = signal(this.readOpen());

  readonly desktopNavOpen = this.openState.asReadonly();

  toggleDesktopNav(): void {
    const next = !this.openState();
    this.openState.set(next);
    this.storage.set(NAV_OPEN_KEY, next);
  }

  private readOpen(): boolean {
    return this.storage.get(NAV_OPEN_KEY) === false ? false : true;
  }
}
