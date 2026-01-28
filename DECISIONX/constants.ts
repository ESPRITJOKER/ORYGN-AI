import { Criterion, Option } from "./types";

export const INITIAL_CRITERIA: Criterion[] = [
  { id: 'c1', name: 'Cost / Price', weight: 5 },
  { id: 'c2', name: 'Long-term Value', weight: 4 },
  { id: 'c3', name: 'Enjoyment', weight: 3 },
];

export const INITIAL_OPTIONS: Option[] = [
  { id: 'o1', name: '' },
  { id: 'o2', name: '' },
];

export const DEMO_DATA = {
  title: "Which laptop should I buy for college?",
  context: "I'm a computer science student. I need battery life and performance, but I'm on a budget.",
  options: [
    { id: 'd1', name: 'MacBook Air M2 (16GB RAM)' },
    { id: 'd2', name: 'Dell XPS 13 Plus' },
    { id: 'd3', name: 'Used ThinkPad X1 Carbon' }
  ],
  criteria: [
    { id: 'dc1', name: 'Battery Life', weight: 5 },
    { id: 'dc2', name: 'Performance', weight: 4 },
    { id: 'dc3', name: 'Price', weight: 5 },
    { id: 'dc4', name: 'Portability', weight: 3 }
  ]
};
