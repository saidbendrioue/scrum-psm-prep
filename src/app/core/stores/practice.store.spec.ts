import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import type { Question } from '../models/question.model';
import { ProgressService } from '../services/progress.service';
import { QuestionService } from '../services/question.service';
import { PracticeStore } from './practice.store';

const sample: Question = {
  id: 'q1',
  category: 'Scrum Theory',
  cert: ['PSM I'],
  difficulty: 'easy',
  type: 'truefalse',
  question: 'Scrum requires a release every Sprint.',
  options: [
    { id: 'a', text: 'False' },
    { id: 'b', text: 'True' },
  ],
  correctOptionIds: ['a'],
  explanation: 'A release is optional; an Increment is required.',
  reference: 'Scrum Guide (2020)',
};

const second: Question = {
  ...sample,
  id: 'q2',
  question: 'The Product Owner is one person.',
  correctOptionIds: ['b'],
};

describe('PracticeStore', () => {
  let store: PracticeStore;
  let progress: ProgressService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        PracticeStore,
        ProgressService,
        {
          provide: QuestionService,
          useValue: {
            byId: (id: string) => [sample, second].find((question) => question.id === id),
          },
        },
      ],
    });
    store = TestBed.inject(PracticeStore);
    progress = TestBed.inject(ProgressService);
  });

  afterEach(() => localStorage.clear());

  it('selects, checks, then advances on next', () => {
    expect(store.start([sample, second], 'practice')).toBe(true);
    const firstId = store.current()!.id;

    expect(store.choose(firstId === 'q1' ? 'a' : 'b')).toBe('idle');
    expect(store.session()!.revealed).toBe(false);
    expect(store.session()!.selected.length).toBe(1);

    expect(store.check()).toBe('revealed');
    expect(store.session()!.revealed).toBe(true);
    expect(store.session()!.answeredCount).toBe(1);

    expect(store.next()).toBe('advanced');
    expect(store.session()!.index).toBe(1);
    expect(store.session()!.revealed).toBe(false);
    expect(store.session()!.selected).toEqual([]);
  });

  it('requires a selection before check and a check before next', () => {
    store.start([sample], 'practice');
    expect(store.check()).toBe('need-answer');
    expect(store.next()).toBe('need-check');
  });

  it('records progress only once when checking', () => {
    const before = progress.state().answers.length;
    store.start([sample], 'practice');
    store.choose('a');
    store.check();
    store.check();
    expect(progress.state().answers.length).toBe(before + 1);
    expect(store.session()!.answeredCount).toBe(1);
  });

  it('submit checks then advances', () => {
    store.start([sample], 'practice');
    store.choose('a');
    expect(store.submit()).toBe('revealed');
    expect(store.submit()).toBe('summary');
  });
});
