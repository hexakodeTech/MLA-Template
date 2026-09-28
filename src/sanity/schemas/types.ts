export interface RuleType {
  required: () => RuleType;
  min?: (n: number) => RuleType;
  max?: (n: number) => RuleType;
  [key: string]: unknown;
}
