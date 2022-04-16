import { block } from 'bem-cn';
import kebabCase from 'lodash';

const mapModifiersToKebabCase = (modifiers: Record<string, boolean>) => {
  return Object.keys(modifiers).reduce((acc, key) => {
    return {
      ...acc,
      [kebabCase(key) as unknown as string]: modifiers[key],
    };
  }, {});
};

const joinMultipleClasses = (classNames: string[]) => {
  if (classNames) {
    return classNames.join(' ');
  }
  return '';
};

export const bem = (blockName: string, transformModifiers = true) => {
  const generator = block(blockName);
  return {
    block: (modifiers = {}, ...classNames: string[]) => {
      return {
        className: generator(transformModifiers ? mapModifiersToKebabCase(modifiers) : modifiers)
          .mix(joinMultipleClasses(classNames))
          .toString(),
      };
    },
    element: (elementName: string, modifiers = {}, ...classNames: string[]) => {
      return {
        className: generator(elementName, transformModifiers ? mapModifiersToKebabCase(modifiers) : modifiers)
          .mix(joinMultipleClasses(classNames))
          .toString(),
      };
    },
  };
};
