import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TIMER_CLOCK, TimerService, type IntervalHandle, type TimerClock } from './timer.service';

class ManualClock implements TimerClock {
  private callback: (() => void) | null = null;

  setInterval(callback: () => void): IntervalHandle {
    this.callback = callback;
    return { id: 1 };
  }

  clearInterval(): void {
    this.callback = null;
  }

  fire(): void {
    this.callback?.();
  }
}

describe('TimerService', () => {
  let timer: TimerService;
  let clock: ManualClock;

  beforeEach(() => {
    clock = new ManualClock();
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), { provide: TIMER_CLOCK, useValue: clock }],
    });
    timer = TestBed.inject(TimerService);
  });

  it('counts down and expires once', () => {
    const expired: string[] = [];
    timer.start(2, () => expired.push('done'));
    expect(timer.remainingSeconds()).toBe(2);
    expect(timer.isRunning()).toBe(true);
    clock.fire();
    expect(timer.remainingSeconds()).toBe(1);
    expect(expired).toEqual([]);
    clock.fire();
    expect(timer.remainingSeconds()).toBe(0);
    expect(timer.isExpired()).toBe(true);
    expect(timer.isRunning()).toBe(false);
    clock.fire();
    expect(expired).toEqual(['done']);
  });

  it('stops a running timer and expires immediately when started at zero', () => {
    const first: string[] = [];
    timer.start(5, () => first.push('first'));
    timer.stop();
    clock.fire();
    expect(timer.isRunning()).toBe(false);
    expect(first).toEqual([]);

    const second: string[] = [];
    timer.start(0, () => second.push('second'));
    expect(second).toEqual(['second']);
    expect(timer.isExpired()).toBe(true);
  });
});
