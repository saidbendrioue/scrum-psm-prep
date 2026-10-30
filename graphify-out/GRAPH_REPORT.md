# Graph Report - workspace  (2026-10-30)

## Corpus Check
- 67 files · ~45,497 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 3, .css 2, .ico 1)

## Summary
- 483 nodes · 970 edges · 18 communities (13 shown, 5 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c586121c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- practice.component.ts
- progress.service.ts
- app.component.ts
- package.json
- PracticeStore
- schematics
- scoring.ts
- development
- timer.service.ts
- ExamStore
- question-bank.mjs
- PracticeComponent
- ExamSessionComponent
- ExamSetupComponent
- AnswerReviewComponent
- steps
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
- `Architecture` --references--> `ExamStore`  [INFERRED]
  README.md → src/app/core/stores/exam.store.ts
- `Architecture` --references--> `PracticeStore`  [INFERRED]
  README.md → src/app/core/stores/practice.store.ts
- `nextStreak()` --calls--> `todayKey()`  [EXTRACTED]
  src/app/core/stats/progress-stats.ts → src/app/core/format.ts
- `ProgressState` --references--> `reviewCard`  [EXTRACTED]
  src/app/core/models/progress.model.ts → src/app/core/sm2/sm2.ts
- `ExamConfig` --references--> `Difficulty`  [EXTRACTED]
  src/app/core/stores/exam.store.ts → src/app/core/models/question.model.ts

## Import Cycles
- None detected.

## Communities (18 total, 5 thin omitted)

### Community 0 - "practice.component.ts"
Cohesion: 0.07
Nodes (39): @angular/core, rxjs, filterQuestions(), shuffle(), questions, formatWhen(), Certification, CERTIFICATIONS (+31 more)

### Community 1 - "progress.service.ts"
Cohesion: 0.09
Nodes (30): STORAGE_KEY, todayKey(), CategoryStat, EMPTY_PROGRESS, ExamSnapshot, ExamStatus, ProgressState, ProgressSummary (+22 more)

### Community 2 - "app.component.ts"
Cohesion: 0.06
Nodes (19): @angular/common@^21.2.0, @angular/common, @angular/router, App, appConfig, routes, examSessionGuard(), ThemeService (+11 more)

### Community 3 - "package.json"
Cohesion: 0.06
Nodes (45): dependencies, @angular/compiler@^21.2.0, @angular/core@^21.2.0, @angular/forms@^21.2.0, @angular/platform-browser@^21.2.0, @angular/router@^21.2.0, chart.js@^4.6.1, rxjs@~7.8.0 (+37 more)

### Community 4 - "PracticeStore"
Cohesion: 0.16
Nodes (7): Add a question, Architecture, Design decisions and what to build next, Java QCM, Run, What you can do, PracticeStore

### Community 5 - "schematics"
Cohesion: 0.06
Nodes (31): cli, packageManager, newProjectRoot, projects, scrum-psm-prep, $schema, addTypeToClassName, type (+23 more)

### Community 6 - "scoring.ts"
Cohesion: 0.13
Nodes (12): PASS_THRESHOLD, AnswerOption, buildScore(), isAnswerCorrect(), normalizeSelection(), optionLetter(), scoreAttempt(), ScoreResult (+4 more)

### Community 7 - "development"
Cohesion: 0.09
Nodes (25): build, serve, test, builder, configurations, defaultConfiguration, options, development (+17 more)

### Community 8 - "timer.service.ts"
Cohesion: 0.12
Nodes (13): APP_NAME, NAV_OPEN_KEY, PSM_MINUTES, PSM_QUESTION_COUNT, Difficulty, BrowserTimerClock, IntervalHandle, ManualClock (+5 more)

### Community 10 - "ExamStore"
Cohesion: 0.12
Nodes (6): createId(), elapsedSeconds(), formatDuration(), ExamStore, ExamResultsComponent, TimerDisplayComponent

### Community 11 - "question-bank.mjs"
Cohesion: 0.15
Nodes (10): categoryCount, difficulties, difficultyCount, ids, output, q(), questions, tf() (+2 more)

### Community 12 - "PracticeComponent"
Cohesion: 0.12
Nodes (6): dueIds(), latestAnswers(), mistakeIds(), summarize(), PracticeComponent, ReviewComponent

### Community 16 - "steps"
Cohesion: 0.06
Nodes (33): runs-on, steps, concurrency, cancel-in-progress, group, environment, needs, runs-on (+25 more)

## Knowledge Gaps
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@angular/core` connect `practice.component.ts` to `progress.service.ts`, `app.component.ts`, `package.json`, `scoring.ts`, `timer.service.ts`, `ExamStore`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Should `practice.component.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06738738738738739 - nodes in this community are weakly interconnected._
- **Why does `@angular/router` connect `app.component.ts` to `timer.service.ts`, `practice.component.ts`, `package.json`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Should `progress.service.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08571428571428572 - nodes in this community are weakly interconnected._
- **Why does `ExamStore` connect `ExamStore` to `timer.service.ts`, `practice.component.ts`, `app.component.ts`, `PracticeStore`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Should `app.component.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05877551020408163 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.057971014492753624 - nodes in this community are weakly interconnected._