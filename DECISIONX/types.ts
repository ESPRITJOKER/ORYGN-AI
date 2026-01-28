export interface Criterion {
  id: string;
  name: string;
  weight: number; // 1-5
}

export interface Option {
  id: string;
  name: string;
}

export interface DecisionInput {
  title: string;
  context?: string;
  options: Option[];
  criteria: Criterion[];
}

export interface ScoredOption {
  id: string;
  name: string;
  score: number; // 0-100
  reasoning: string[]; // max 3 bullets
  matchTags: string[]; // e.g., "Best for Cost", "High Risk"
}

export interface BiasInsight {
  detected: boolean;
  type?: string;
  message?: string;
}

export interface AnalysisResult {
  rankedOptions: ScoredOption[];
  winningOptionId: string;
  biasInsight: BiasInsight;
  summary: string;
}

export enum AppState {
  INPUT = 'INPUT',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}
