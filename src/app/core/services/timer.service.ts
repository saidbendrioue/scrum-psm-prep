import { Injectable, InjectionToken, inject, signal } from '@angular/core';

export interface IntervalHandle {
  id: number;
}

export interface TimerClock {
  setInterval(callback: () => void, ms: number): IntervalHandle;
  clearInterval(handle: IntervalHandle): void;
}

export class BrowserTimerClock implements TimerClock {
  setInterval(callback: () => void, ms: number): IntervalHandle {
    return { id: window.setInterval(callback, ms) };
  }

  clearInterval(handle: IntervalHandle): void {
    window.clearInterval(handle.id);
  }
}

export const TIMER_CLOCK = new InjectionToken<TimerClock>('TIMER_CLOCK', {
  providedIn: 'root',
  factory: () => new BrowserTimerClock(),
});

@Injectable({ providedIn: 'root' })
export class TimerService {
  private readonly clock = inject(TIMER_CLOCK);
  private readonly remaining = signal(0);
  private readonly running = signal(false);
  private readonly expired = signal(false);
  private handle: IntervalHandle | null = null;
  private onExpire: (() => void) | null = null;

  readonly remainingSeconds = this.remaining.asReadonly();
  readonly isRunning = this.running.asReadonly();
  readonly isExpired = this.expired.asReadonly();

  start(seconds: number, onExpire: () => void): void {
    this.stop();
    this.onExpire = onExpire;
    this.expired.set(false);
    this.remaining.set(Math.max(0, Math.floor(seconds)));
    if (this.remaining() === 0) {
      this.expired.set(true);
      const expire = this.onExpire;
      this.onExpire = null;
      expire?.();
      return;
    }
    this.running.set(true);
    this.handle = this.clock.setInterval(() => this.tick(), 1000);
  }

  stop(): void {
    if (this.handle) {
      this.clock.clearInterval(this.handle);
      this.handle = null;
    }
    this.running.set(false);
    this.onExpire = null;
  }

  tick(): void {
    if (!this.running()) return;
    const next = this.remaining() - 1;
    this.remaining.set(Math.max(0, next));
    if (next <= 0) {
      const expire = this.onExpire;
      this.stop();
      this.expired.set(true);
      expire?.();
    }
  }
}
