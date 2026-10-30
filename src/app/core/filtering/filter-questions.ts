import type { Question, QuestionFilter } from '../models/question.model';

export function filterQuestions(questions: readonly Question[], filter: QuestionFilter): Question[] {
  const search = filter.search.trim().toLowerCase();
  const allowedIds = filter.questionIds ? new Set(filter.questionIds) : null;
  return questions.filter((question) => {
    if (allowedIds && !allowedIds.has(question.id)) return false;
    if (filter.categories.length > 0 && !filter.categories.includes(question.category)) return false;
    if (filter.difficulties.length > 0 && !filter.difficulties.includes(question.difficulty)) return false;
    if (filter.certs.length > 0 && !question.cert.some((cert) => filter.certs.includes(cert))) return false;
    if (filter.types.length > 0 && !filter.types.includes(question.type)) return false;
    if (!search) return true;
    const haystack = [question.question, question.explanation, question.category, question.reference]
      .concat(question.options.map((option) => option.text))
      .join(' ')
      .toLowerCase();
    return haystack.includes(search);
  });
}

export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    const current = copy[index];
    const swap = copy[swapIndex];
    if (current === undefined || swap === undefined) continue;
    copy[index] = swap;
    copy[swapIndex] = current;
  }
  return copy;
}
