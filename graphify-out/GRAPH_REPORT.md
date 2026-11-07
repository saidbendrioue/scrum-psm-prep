# Graph Report - scrum-psm-prep  (2026-11-07)

## Corpus Check
- 72 files · ~61,909 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 3, .css 3, .ico 1)

## Summary
- 525 nodes · 1042 edges · 28 communities (19 shown, 9 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ba62cf47`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- progress.service.ts
- progress.service.ts
- StorageService
- package.json
- practice.component.ts
- schematics
- scoring.ts
- development
- timer.service.ts
- app.routes.ts
- ExamStore
- question-bank.mjs
- PracticeComponent
- ExamSessionComponent
- ExamSetupComponent
- AnswerReviewComponent
- steps
- PracticeStore
- CategoryChartComponent
- DashboardComponent
- dependencies
- Audit banque PSM I — 2026-11-07
- Design System Master File
- scripts
- ThemeService
- App
- nav-items.ts
- TopbarComponent

## God Nodes (most connected - your core abstractions)
1. `@angular/core` - 37 edges
2. `ProgressService` - 29 edges
3. `Question` - 21 edges
4. `@angular/router` - 20 edges
5. `ExamStore` - 19 edges
6. `QuestionService` - 16 edges
7. `PracticeStore` - 14 edges
8. `PracticeComponent` - 14 edges
9. `AnswerReviewComponent` - 13 edges
10. `isAnswerCorrect()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Architecture` --references--> `ExamStore`  [INFERRED]
  README.md → src/app/core/stores/exam.store.ts
- `Architecture` --references--> `PracticeStore`  [INFERRED]
  README.md → src/app/core/stores/practice.store.ts
- `ExamConfig` --references--> `Difficulty`  [EXTRACTED]
  src/app/core/stores/exam.store.ts → src/app/core/models/question.model.ts
- `AnswerReviewRow` --references--> `Question`  [EXTRACTED]
  src/app/shared/answer-review.component.ts → src/app/core/models/question.model.ts
- `ProgressState` --references--> `reviewCard`  [EXTRACTED]
  src/app/core/models/progress.model.ts → src/app/core/sm2/sm2.ts

## Import Cycles
- None detected.

## Communities (28 total, 9 thin omitted)

### Community 0 - "progress.service.ts"
Cohesion: 0.08
Nodes (32): @angular/core, @angular/router, APP_NAME, NAV_OPEN_KEY, PSM_MINUTES, PSM_QUESTION_COUNT, STORAGE_KEY, createId() (+24 more)

### Community 1 - "progress.service.ts"
Cohesion: 0.10
Nodes (27): todayKey(), CategoryStat, EMPTY_PROGRESS, ExamSnapshot, ExamStatus, ProgressState, ProgressSummary, StoredAnswer (+19 more)

### Community 3 - "package.json"
Cohesion: 0.11
Nodes (25): devDependencies, @angular/build@^21.2.29, @angular/cli@^21.2.29, @angular/compiler-cli@^21.2.0, jsdom@^28.0.0, postcss@^8.5.3, prettier@^3.8.1, tailwindcss@^4.1.12 (+17 more)

### Community 4 - "practice.component.ts"
Cohesion: 0.06
Nodes (30): filterQuestions(), shuffle(), shuffleQuestionOptions(), questions, withShuffledOptions(), Certification, CERTIFICATIONS, DIFFICULTIES (+22 more)

### Community 5 - "schematics"
Cohesion: 0.06
Nodes (32): cli, analytics, packageManager, newProjectRoot, projects, scrum-psm-prep, $schema, addTypeToClassName (+24 more)

### Community 6 - "scoring.ts"
Cohesion: 0.12
Nodes (13): PASS_THRESHOLD, AnswerOption, Question, buildScore(), isAnswerCorrect(), normalizeSelection(), optionLetter(), scoreAttempt() (+5 more)

### Community 7 - "development"
Cohesion: 0.09
Nodes (25): build, serve, test, builder, configurations, defaultConfiguration, options, development (+17 more)

### Community 8 - "timer.service.ts"
Cohesion: 0.17
Nodes (6): BrowserTimerClock, IntervalHandle, ManualClock, TIMER_CLOCK, TimerClock, TimerService

### Community 9 - "app.routes.ts"
Cohesion: 0.18
Nodes (7): @angular/platform-browser@^21.2.0, @angular/platform-browser, appConfig, routes, BROWSER_ROUTES, PRACTICE_ROUTES, REVIEW_ROUTES

### Community 11 - "question-bank.mjs"
Cohesion: 0.15
Nodes (12): situationalQuestions, difficulties, hashSeed(), ids, output, published, q(), questions (+4 more)

### Community 12 - "PracticeComponent"
Cohesion: 0.11
Nodes (6): dueIds(), latestAnswers(), mistakeIds(), summarize(), PracticeComponent, ReviewComponent

### Community 16 - "steps"
Cohesion: 0.06
Nodes (33): runs-on, steps, concurrency, cancel-in-progress, group, environment, needs, runs-on (+25 more)

### Community 17 - "PracticeStore"
Cohesion: 0.12
Nodes (7): Add a question, Architecture, Design decisions and what to build next, PSM I Prep, Run, What you can do, PracticeStore

### Community 18 - "CategoryChartComponent"
Cohesion: 0.29
Nodes (3): chart.js@^4.6.1, chart.js, CategoryChartComponent

### Community 20 - "dependencies"
Cohesion: 0.15
Nodes (13): dependencies, @angular/common@^21.2.0, @angular/compiler@^21.2.0, @angular/core@^21.2.0, @angular/forms@^21.2.0, @angular/router@^21.2.0, rxjs@~7.8.0, tslib@^2.3.0 (+5 more)

### Community 21 - "Audit banque PSM I — 2026-11-07"
Cohesion: 0.25
Nodes (7): Actions réalisées, Audit banque PSM I — 2026-11-07, Couverture Focus Areas Scrum.org (PSM I), Fidélité, Statuts (audit structurel + revue pédagogique), Suite recommandée, Synthèse

### Community 22 - "Design System Master File"
Cohesion: 0.29
Nodes (6): Color, Design System Master File, Direction, Motion, Radius & depth, Type

### Community 23 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, ng, start, test, watch

### Community 26 - "nav-items.ts"
Cohesion: 0.50
Nodes (3): NAV_ITEMS, NavIcon, NavItem

## Knowledge Gaps
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@angular/core` connect `progress.service.ts` to `package.json`, `practice.component.ts`, `scoring.ts`, `timer.service.ts`, `app.routes.ts`, `CategoryChartComponent`, `dependencies`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Should `progress.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08056265984654731 - nodes in this community are weakly interconnected._
- **Why does `ExamStore` connect `ExamStore` to `progress.service.ts`, `PracticeStore`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Should `progress.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10121951219512196 - nodes in this community are weakly interconnected._
- **Why does `@angular/router` connect `progress.service.ts` to `app.routes.ts`, `package.json`, `dependencies`, `practice.component.ts`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1076923076923077 - nodes in this community are weakly interconnected._
- **Should `practice.component.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05734767025089606 - nodes in this community are weakly interconnected._