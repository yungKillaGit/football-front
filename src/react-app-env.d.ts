/// <reference types="react-scripts" />

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type RequiredKey<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

type EmptyObject = Record<string, never>
