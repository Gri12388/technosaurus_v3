import { SpecificationType } from '@/types/types';
import {
  parseCategory,
  parseColors,
  parseId,
  parseImage,
  parseMainProp,
  parseOffers,
} from '@/helpers/parsers/commonParsers';
import { cloneDeep } from 'lodash';
import { defaultProduct, defaultSpec } from '@/constants/constants';

export const parseContent = (content: unknown) => {
  if (typeof content === 'string') return content;
  else throw new Error('Variable "content" is not typeof "string"');
};

export const parseSpecification = (spec: unknown) => {
  const temp = cloneDeep(defaultSpec);

  if (typeof spec === 'object' && spec !== null) {
    if ('id' in spec && typeof spec.id === 'number') {
      temp.id = spec.id;
    } else throw new Error('Field "spec.id" is absent or is not type of "number"');

    if ('title' in spec && typeof spec.title === 'string') {
      temp.title = spec.title;
    } else throw new Error('Field "spec.title" is absent or is not type of "string"');

    if ('value' in spec && typeof spec.value === 'string') {
      temp.value = spec.value;
    } else throw new Error('Field "spec.value" is absent or is not type of "string"');
  } else throw new Error('Variable "spec" is not an object');

  return temp;
};

export const parseSpecifications = (specs: unknown) => {
  if (Array.isArray(specs)) {
    return specs.reduce((acc: SpecificationType[], item: unknown) => {
      try {
        const spec = parseSpecification(item);
        return [...acc, spec];
      } catch (err) {
        console.error(err);
        return acc;
      }
    }, []);
  } else throw new Error('Variable "specs" is not an array');
};

export const parseProductObj = (product: unknown) => {
  const temp = cloneDeep(defaultProduct);

  if (typeof product === 'object' && product !== null) {
    if ('id' in product) temp.id = parseId(product.id);

    if ('preview' in product) temp.image = parseImage(product.preview);

    if ('mainProp' in product) temp.mainProp = parseMainProp(product.mainProp);

    if ('colors' in product) temp.colors = parseColors(product.colors);

    if ('offers' in product) temp.offers = parseOffers(product.offers);

    if ('specifications' in product) temp.specifications = parseSpecifications(product.specifications);

    if ('category' in product) temp.category = parseCategory(product.category);

    if ('content' in product) temp.content = parseContent(product.content);
  } else throw new Error('Variable "product" is not an object');

  return temp;
};
