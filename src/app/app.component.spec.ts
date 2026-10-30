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
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  it('renders the Java QCM shell', async () => {
    const fixture = TestBed.createComponent(App);
    http.expectOne('assets/questions.json').flush([
      {
        id: 'q001',
        category: 'Types and OOP',
        cert: ['Java'],
        difficulty: 'easy',
        type: 'truefalse',
        question: 'int is a primitive type.',
        options: [
          { id: 'a', text: 'True' },
          { id: 'b', text: 'False' },
        ],
        correctOptionIds: ['a'],
        explanation: 'int is one of the eight primitive types.',
        reference: 'Java Language Specification — Primitive Types and Values',
      },
    ]);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Java QCM');
  });
});
