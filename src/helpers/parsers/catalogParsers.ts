import { ProdCardType } from '@/types/types';
import {
  parseColors,
  parseId,
  parseImage,
  parseMainProp,
  parseOffers,
} from '@/helpers/parsers/commonParsers';

export { parseCategory } from '@/helpers/parsers/commonParsers';

const parsePagination = (pagination: unknown) => {
  let pages = 0;
  let total = 0;

  if (typeof pagination === 'object' && pagination !== null) {
    if ('pages' in pagination && typeof pagination.pages === 'number') {
      pages = pagination.pages;
    } else throw new Error('Field "pagination.pages" is absent or is not type of "number"');

    if ('total' in pagination && typeof pagination.total === 'number') {
      total = pagination.total;
    } else throw new Error('Field "pagination.total" is absent or is not typeof "number"');
  } else throw new Error('Variable "pagination" is not an object');

  return { pages, total };
};

const parseItem = (item: unknown) => {
  const temp: ProdCardType = {
    id: -1,
    image: '',
    mainProp: { id: -1, code: '', title: '' },
    colors: [],
    offers: [],
  };

  if (typeof item === 'object' && item !== null) {
    if ('id' in item) temp.id = parseId(item.id);

    if ('preview' in item) temp.image = parseImage(item.preview);

    if ('mainProp' in item) temp.mainProp = parseMainProp(item.mainProp);

    if ('colors' in item) temp.colors = parseColors(item.colors);

    if ('offers' in item) temp.offers = parseOffers(item.offers);
  } else throw new Error('Variable "item" is not an object');

  return temp;
};

const parseItems = (items: unknown) => {
  if (Array.isArray(items)) {
    return items.reduce((acc: ProdCardType[], item: unknown) => {
      try {
        const card = parseItem(item);
        return [...acc, card];
      } catch (err) {
        console.error(err);
        return acc;
      }
    }, []);
  } else throw new Error('Variable "items" is not an array');
};

export const parseProducts = (products: unknown) => {
  let cards: ProdCardType[] = [];
  let pages = 0;
  let total = 0;

  if (typeof products === 'object' && products !== null) {
    if ('pagination' in products) {
      const pagination = parsePagination(products.pagination);
      pages = pagination.pages;
      total = pagination.total;
    } else throw new Error('Field "products.pagination" is absent');

    if ('items' in products) {
      cards = parseItems(products.items);
    } else throw new Error('Field "value.items" is absent');
  } else throw new Error('Variable "products" is not an object');

  return { cards, pages, total };
};
