export const replace = <T>(array: T[], index: number, element: T) => {
  return [...array.slice(0, index), element, ...array.slice(index + 1)];
};
