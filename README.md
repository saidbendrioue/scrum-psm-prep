# Java QCM

A single-page Angular app for practicing Java with multiple-choice questions. Study one question at a time, take a timed mock exam, review explanations, and keep progress in the browser.

The mock exam used by this app is **80 questions, 60 minutes, and 85% to pass**. The bank covers types and OOP, collections, exceptions, generics, equals and hashCode, immutability, streams, concurrency basics, and the JVM.

## Run

```bash
npm install
npm start
```

Open `http://localhost:4200`.

```bash
npm test
npm run build
```

`npm test` runs the Vitest unit tests once. `npm run build` is the production build.

## What you can do

- **Practice** one question at a time, with an explanation immediately after you submit. Keys: `1`–`9` select, `Enter` submits or continues, `F` bookmarks.
- **Mock exam** hides explanations until you submit or the timer expires. A full simulation is 80 questions and 60 minutes. Leaving the page does not wipe the exam; the deadline is stored locally and restored on reload.
- **Question bank** searches and filters the Java items and shows the explanation for each one.
- **Review** lists latest misses, bookmarks, and cards that are due under a simple SM-2 schedule.
- **Dashboard** shows accuracy by category, streak, exam history, and export or import of progress as JSON.
- **Dark mode** is remembered with the rest of your progress.

There is no account and no server. Progress is stored in `localStorage` under `psm-prep-state`.

## Architecture

Standalone components only. Feature routes are lazy-loaded.

```text
src/app/
  core/        models, scoring, filtering, SM-2, storage, progress, timer, stores
  shared/      answer option, question card, timer, chart, filters, empty and loading states
  layout/      sidebar, mobile nav, top bar
  features/    dashboard, practice, exam, review, browser
public/assets/questions.json
```

State lives in signal-based services and two stores (`PracticeStore`, `ExamStore`). Scoring, filtering, and the timer clock are pure or injectable so they can be unit-tested without the UI. The pass mark is a pure function: unanswered questions count as incorrect, and duplicate multi-select choices are ignored.

## Add a question

Edit `public/assets/questions.json`. Each item looks like this:

```json
{
  "id": "q140",
  "category": "JVM",
  "cert": ["Java"],
  "difficulty": "medium",
  "type": "single",
  "question": "…",
  "options": [{ "id": "a", "text": "…" }],
  "correctOptionIds": ["a"],
  "explanation": "…",
  "reference": "Java Language Specification — Section …"
}
```

Rules the app enforces when it loads the file:

- `difficulty` is `easy`, `medium`, or `hard`.
- `type` is `single`, `multiple`, or `truefalse`.
- `single` and `truefalse` have exactly one correct option. `multiple` has at least two.
- `truefalse` has exactly two options.
- Every correct id exists on an option, and ids are unique.
- `cert` currently uses `Java`. `OCP` is allowed by the model for a later bank.

`scripts/question-bank.mjs` is the authoring source for the current bank. Run `node scripts/question-bank.mjs` to regenerate the JSON after editing that file. If you prefer, edit the JSON directly and leave the script alone.

## Design decisions and what to build next

The bank is a Java interview QCM: one correct answer on single-choice and true-or-false items, and every correct option selected on multiple-answer items. Explanations state why the right answer is right.

Progress stays on the device so the app works without a backend. An in-progress exam stores its deadline, not a running clock, so a reload cannot pause the timer. Missed answered questions enter a small SM-2 queue; blank exam answers count against the score and show up as mistakes, but they do not create a review card until the person has actually chosen an answer.

Chart.js is loaded only with the dashboard route. Tailwind theme tokens carry the light and dark palettes, including the green, red, and amber states for correct, incorrect, and bookmarked items.

Next, I would add a second bank for a narrower track such as OCP, a preset that builds an exam from the weakest categories on the dashboard chart, and short code snippets beside the questions that need them. The GitHub repository name is unchanged.
