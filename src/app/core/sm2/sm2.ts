export interface ReviewCard {
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  dueAt: string;
  lastReviewedAt: string | null;
}

export function createCard(now: Date): ReviewCard {
  return {
    easeFactor: 2.5,
    intervalDays: 0,
    repetitions: 0,
    dueAt: now.toISOString(),
    lastReviewedAt: null,
  };
}

/** quality is 0–5. Below 3 is a lapse and resets the interval. */
export function reviewCard(card: ReviewCard, quality: number, now: Date): ReviewCard {
  const q = Math.max(0, Math.min(5, Math.round(quality)));
  let easeFactor = card.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  let repetitions = card.repetitions;
  let intervalDays = card.intervalDays;
  if (q < 3) {
    repetitions = 0;
    intervalDays = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 6;
    else intervalDays = Math.max(1, Math.round(card.intervalDays * easeFactor));
  }

  const due = new Date(now.getTime());
  due.setUTCDate(due.getUTCDate() + intervalDays);
  return {
    easeFactor,
    intervalDays,
    repetitions,
    dueAt: due.toISOString(),
    lastReviewedAt: now.toISOString(),
  };
}

export function scheduleAfterAnswer(
  cards: Readonly<Record<string, ReviewCard>>,
  questionId: string,
  selected: readonly string[],
  correct: boolean,
  now: Date,
): Record<string, ReviewCard> {
  if (selected.length === 0) return { ...cards };
  const existing = cards[questionId];
  if (!existing && correct) return { ...cards };
  const next = !existing ? { ...createCard(now), dueAt: now.toISOString() } : reviewCard(existing, correct ? 4 : 2, now);
  return { ...cards, [questionId]: next };
}
