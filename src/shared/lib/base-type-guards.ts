export function isNumberOrString(value: unknown): value is number | string {
  return typeof value === 'string' || !Number.isNaN(value);
}
