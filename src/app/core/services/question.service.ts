import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import type { Certification } from '../models/question.model';
import { parseQuestions, type Question } from '../models/question.model';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private readonly http = inject(HttpClient);
  private readonly questionsState = signal<Question[]>([]);
  private readonly statusState = signal<'loading' | 'ready' | 'error'>('loading');
  private readonly errorState = signal<string | null>(null);
  private pending: Promise<void> | null = null;

  readonly questions = this.questionsState.asReadonly();
  readonly status = this.statusState.asReadonly();
  readonly error = this.errorState.asReadonly();
  readonly categories = computed(() => [...new Set(this.questions().map((question) => question.category))].sort());
  readonly certifications = computed(() => {
    const found = new Set<Certification>();
    for (const question of this.questions()) {
      for (const cert of question.cert) found.add(cert);
    }
    return [...found];
  });

  load(): Promise<void> {
    if (this.statusState() === 'ready') return Promise.resolve();
    if (this.pending) return this.pending;
    this.statusState.set('loading');
    this.errorState.set(null);
    this.pending = firstValueFrom(this.http.get<unknown>('assets/questions.json'))
      .then((payload) => {
        const questions = parseQuestions(payload);
        if (!questions || questions.length === 0) throw new Error('invalid question bank');
        this.questionsState.set(questions);
        this.statusState.set('ready');
      })
      .catch(() => {
        this.errorState.set('The question bank could not be loaded.');
        this.statusState.set('error');
        this.pending = null;
      });
    return this.pending;
  }

  byId(id: string): Question | undefined {
    return this.questions().find((question) => question.id === id);
  }
}
