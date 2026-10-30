import { PASS_THRESHOLD } from '../constants';
import type { Question } from '../models/question.model';

export interface ScoreResult {
  correctCount: number;
  total: number;
  percent: number;
  passed: boolean;
  unanswered: number;
}

export function normalizeSelection(ids: readonly string[]): string[] {
  return [...new Set(ids)].sort();
}

export function isAnswerCorrect(question: Question, selectedIds: readonly string[]): boolean {
  const selected = normalizeSelection(selectedIds);
  const correct = normalizeSelection(question.correctOptionIds);
  return selected.length === correct.length && selected.every((id, index) => id === correct[index]);
}

export function toggleSelection(question: Question, selectedIds: readonly string[], optionId: string): string[] {
  if (!question.options.some((option) => option.id === optionId)) {
    return normalizeSelection(selectedIds);
  }
  if (question.type === 'multiple') {
    const selected = new Set(normalizeSelection(selectedIds));
    if (selected.has(optionId)) selected.delete(optionId);
    else selected.add(optionId);
    return [...selected];
  }
  return [optionId];
}

export function buildScore(correctCount: number, total: number, unanswered: number): ScoreResult {
  const safeTotal = Math.max(0, total);
  const ratio = safeTotal === 0 ? 0 : correctCount / safeTotal;
  return {
    correctCount,
    total: safeTotal,
    percent: Math.round(ratio * 1000) / 10,
    passed: safeTotal > 0 && ratio * 100 >= PASS_THRESHOLD,
    unanswered,
  };
}

export function scoreAttempt(
  questions: readonly Question[],
  answers: Readonly<Record<string, readonly string[]>>,
): ScoreResult {
  let correctCount = 0;
  let unanswered = 0;
  for (const question of questions) {
    const selected = answers[question.id] ?? [];
    if (selected.length === 0) {
      unanswered += 1;
      continue;
    }
    if (isAnswerCorrect(question, selected)) correctCount += 1;
  }
  return buildScore(correctCount, questions.length, unanswered);
}

export function formatPercent(value: number): string {
  return Number.isInteger(value) ? `${value}%` : `${value.toFixed(1)}%`;
}

export function optionLetter(index: number): string {
  return String.fromCharCode(65 + index);
}
