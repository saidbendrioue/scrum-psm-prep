export const DIFFICULTIES = ['easy', 'medium', 'hard'] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

export const QUESTION_TYPES = ['single', 'multiple', 'truefalse'] as const;
export type QuestionType = (typeof QUESTION_TYPES)[number];

export function questionTypeLabel(type: QuestionType): string {
  if (type === 'multiple') return 'Multiple answers';
  if (type === 'truefalse') return 'True or false';
  return 'One answer';
}

export const CERTIFICATIONS = ['PSM I', 'CSM', 'PSPO I'] as const;
export type Certification = (typeof CERTIFICATIONS)[number];

export interface AnswerOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  category: string;
  cert: Certification[];
  difficulty: Difficulty;
  type: QuestionType;
  question: string;
  options: AnswerOption[];
  correctOptionIds: string[];
  explanation: string;
  reference: string;
}

export interface QuestionFilter {
  search: string;
  categories: readonly string[];
  difficulties: readonly Difficulty[];
  certs: readonly Certification[];
  types: readonly QuestionType[];
  questionIds: readonly string[] | null;
}

export const EMPTY_FILTER: QuestionFilter = {
  search: '',
  categories: [],
  difficulties: [],
  certs: ['PSM I'],
  types: [],
  questionIds: null,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isDifficulty(value: unknown): value is Difficulty {
  return typeof value === 'string' && DIFFICULTIES.some((item) => item === value);
}

function isQuestionType(value: unknown): value is QuestionType {
  return typeof value === 'string' && QUESTION_TYPES.some((item) => item === value);
}

function isCertification(value: unknown): value is Certification {
  return typeof value === 'string' && CERTIFICATIONS.some((item) => item === value);
}

function parseOption(value: unknown): AnswerOption | null {
  if (!isRecord(value) || typeof value['id'] !== 'string' || typeof value['text'] !== 'string') {
    return null;
  }
  const id = value['id'].trim();
  const text = value['text'].trim();
  if (!id || !text) return null;
  return { id, text };
}

export function parseQuestions(payload: unknown): Question[] | null {
  if (!Array.isArray(payload)) return null;
  const questions: Question[] = [];
  const ids = new Set<string>();
  for (const item of payload) {
    const question = parseQuestion(item);
    if (!question || ids.has(question.id)) return null;
    ids.add(question.id);
    questions.push(question);
  }
  return questions;
}

function parseQuestion(value: unknown): Question | null {
  if (!isRecord(value)) return null;
  if (
    typeof value['id'] !== 'string' ||
    typeof value['category'] !== 'string' ||
    typeof value['question'] !== 'string' ||
    typeof value['explanation'] !== 'string' ||
    typeof value['reference'] !== 'string'
  ) {
    return null;
  }
  const id = value['id'].trim();
  const category = value['category'].trim();
  const question = value['question'].trim();
  const explanation = value['explanation'].trim();
  const reference = value['reference'].trim();
  if (!id || !category || !question || !explanation || !reference) return null;
  if (!isDifficulty(value['difficulty']) || !isQuestionType(value['type'])) return null;
  if (!Array.isArray(value['cert']) || value['cert'].length === 0) return null;
  const cert: Certification[] = [];
  for (const item of value['cert']) {
    if (!isCertification(item)) return null;
    cert.push(item);
  }
  if (!Array.isArray(value['options'])) return null;
  const options = value['options'].map(parseOption);
  if (options.some((option) => option === null)) return null;
  const parsedOptions = options.filter((option): option is AnswerOption => option !== null);
  const optionIds = new Set(parsedOptions.map((option) => option.id));
  if (optionIds.size !== parsedOptions.length || parsedOptions.length < 2) return null;
  if (!Array.isArray(value['correctOptionIds']) || !value['correctOptionIds'].every((id) => typeof id === 'string')) {
    return null;
  }
  const correctOptionIds = [...new Set(value['correctOptionIds'])];
  if (correctOptionIds.length === 0 || correctOptionIds.some((optionId) => !optionIds.has(optionId))) {
    return null;
  }
  if ((value['type'] === 'single' || value['type'] === 'truefalse') && correctOptionIds.length !== 1) {
    return null;
  }
  if (value['type'] === 'multiple' && correctOptionIds.length < 2) return null;
  if (value['type'] === 'truefalse' && parsedOptions.length !== 2) return null;
  return {
    id,
    category,
    cert,
    difficulty: value['difficulty'],
    type: value['type'],
    question,
    options: parsedOptions,
    correctOptionIds,
    explanation,
    reference,
  };
}
