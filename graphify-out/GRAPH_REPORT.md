# Graph Report - scrum-psm-prep  (2026-10-30)

## Corpus Check
- 67 files · ~44,458 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 3, .css 2, .ico 1)

## Summary
- 480 nodes · 965 edges · 20 communities (13 shown, 7 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- practice.component.ts
- progress.service.ts
- app.component.ts
- package.json
- question.model.ts
- schematics
- scoring.ts
- development
- timer.service.ts
- @angular/router
- ExamStore
- question-bank.mjs
- PracticeComponent
- ExamSessionComponent
- ExamSetupComponent
- AnswerReviewComponent
- steps
- ReviewComponent
- CategoryChartComponent
- DashboardComponent

## God Nodes (most connected - your core abstractions)
1. `@angular/core` - 36 edges
2. `ProgressService` - 27 edges
3. `@angular/router` - 20 edges
4. `Question` - 19 edges
5. `ExamStore` - 18 edges
6. `QuestionService` - 15 edges
7. `isAnswerCorrect()` - 13 edges
8. `AnswerReviewComponent` - 13 edges
9. `PracticeStore` - 11 edges
10. `PracticeComponent` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Architecture` --references--> `PracticeStore`  [INFERRED]
  README.md → src/app/core/stores/practice.store.ts
- `Architecture` --references--> `ExamStore`  [INFERRED]
  README.md → src/app/core/stores/exam.store.ts
- `nextStreak()` --calls--> `todayKey()`  [EXTRACTED]
  src/app/core/stats/progress-stats.ts → src/app/core/format.ts
- `AnswerReviewRow` --references--> `Question`  [EXTRACTED]
  src/app/shared/answer-review.component.ts → src/app/core/models/question.model.ts
- `ProgressState` --references--> `reviewCard`  [EXTRACTED]
  src/app/core/models/progress.model.ts → src/app/core/sm2/sm2.ts

## Import Cycles
- None detected.

## Communities (20 total, 7 thin omitted)

### Community 0 - "practice.component.ts"
Cohesion: 0.10
Nodes (21): @angular/core, rxjs, elapsedSeconds(), formatDuration(), formatWhen(), formatPercent(), QuestionService, Toast (+13 more)

### Community 1 - "progress.service.ts"
Cohesion: 0.10
Nodes (27): todayKey(), CategoryStat, EMPTY_PROGRESS, ExamSnapshot, ExamStatus, ProgressState, ProgressSummary, StoredAnswer (+19 more)

### Community 2 - "app.component.ts"
Cohesion: 0.08
Nodes (11): NAV_OPEN_KEY, STORAGE_KEY, ThemeName, StorageService, ThemeService, NAV_ITEMS, NavItem, ShellService (+3 more)

### Community 3 - "package.json"
Cohesion: 0.06
Nodes (43): dependencies, @angular/compiler@^21.2.0, @angular/core@^21.2.0, @angular/platform-browser@^21.2.0, @angular/router@^21.2.0, chart.js@^4.6.1, rxjs@~7.8.0, tslib@^2.3.0 (+35 more)

### Community 4 - "question.model.ts"
Cohesion: 0.10
Nodes (28): @angular/forms@^21.2.0, @angular/forms, APP_NAME, PASS_THRESHOLD, PSM_MINUTES, PSM_QUESTION_COUNT, filterQuestions(), questions (+20 more)

### Community 5 - "schematics"
Cohesion: 0.06
Nodes (31): cli, packageManager, newProjectRoot, projects, scrum-psm-prep, $schema, addTypeToClassName, type (+23 more)

### Community 6 - "scoring.ts"
Cohesion: 0.09
Nodes (19): shuffle(), StudyMode, AnswerOption, Question, buildScore(), isAnswerCorrect(), normalizeSelection(), optionLetter() (+11 more)

### Community 7 - "development"
Cohesion: 0.09
Nodes (25): build, serve, test, builder, configurations, defaultConfiguration, options, development (+17 more)

### Community 8 - "timer.service.ts"
Cohesion: 0.17
Nodes (6): BrowserTimerClock, IntervalHandle, ManualClock, TIMER_CLOCK, TimerClock, TimerService

### Community 9 - "@angular/router"
Cohesion: 0.12
Nodes (12): @angular/common@^21.2.0, @angular/common, @angular/router, App, appConfig, routes, examSessionGuard(), BROWSER_ROUTES (+4 more)

### Community 10 - "ExamStore"
Cohesion: 0.12
Nodes (8): Add a question, Architecture, Design decisions and what to build next, PSM I Prep, Run, What you can do, createId(), ExamStore

### Community 11 - "question-bank.mjs"
Cohesion: 0.20
Nodes (7): difficulties, ids, output, q(), questions, tf(), types

### Community 16 - "steps"
Cohesion: 0.06
Nodes (33): runs-on, steps, concurrency, cancel-in-progress, group, environment, needs, runs-on (+25 more)

## Knowledge Gaps
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@angular/core` connect `practice.component.ts` to `app.component.ts`, `package.json`, `question.model.ts`, `scoring.ts`, `timer.service.ts`, `@angular/router`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **Should `practice.component.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09608843537414966 - nodes in this community are weakly interconnected._
- **Why does `@angular/router` connect `@angular/router` to `practice.component.ts`, `app.component.ts`, `package.json`, `question.model.ts`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Should `progress.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09725158562367865 - nodes in this community are weakly interconnected._
- **Why does `ExamStore` connect `ExamStore` to `practice.component.ts`, `app.component.ts`, `question.model.ts`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Should `app.component.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07957957957957958 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06025369978858351 - nodes in this community are weakly interconnected._