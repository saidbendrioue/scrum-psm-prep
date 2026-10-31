import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app.component';

describe('App', () => {
  let http: HttpTestingController;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection(), provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  it('renders the PSM 1 Quizz shell', async () => {
    const fixture = TestBed.createComponent(App);
    http.expectOne('assets/questions.json').flush([
      {
        id: 'q001',
        category: 'Scrum Theory',
        cert: ['PSM I'],
        difficulty: 'easy',
        type: 'truefalse',
        question: 'Scrum is a framework.',
        options: [
          { id: 'a', text: 'True' },
          { id: 'b', text: 'False' },
        ],
        correctOptionIds: ['a'],
        explanation: 'Scrum is a lightweight framework.',
        reference: 'Scrum Guide (2020)',
      },
    ]);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('PSM 1');
    expect(fixture.nativeElement.textContent).toContain('Quizz');
  });
});
