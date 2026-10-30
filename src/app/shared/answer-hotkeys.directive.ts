import { Directive, input, output } from '@angular/core';

@Directive({
  selector: '[appAnswerHotkeys]',
  host: {
    '(window:keydown)': 'onKey($event)',
  },
})
export class AnswerHotkeysDirective {
  readonly enabled = input(true);
  readonly count = input(0);
  readonly choose = output<number>();
  readonly confirm = output<void>();
  readonly flag = output<void>();

  onKey(event: KeyboardEvent): void {
    if (!this.enabled() || event.metaKey || event.ctrlKey || event.altKey) return;
    const target = event.target;
    if (target instanceof HTMLElement) {
      const tag = target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable) return;
    }
    if (/^[1-9]$/.test(event.key)) {
      const index = Number(event.key) - 1;
      if (index >= this.count()) return;
      event.preventDefault();
      this.choose.emit(index);
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      this.confirm.emit();
      return;
    }
    if (event.key.toLowerCase() === 'f') {
      event.preventDefault();
      this.flag.emit();
    }
  }
}
